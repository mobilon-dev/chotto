import {
    createApp,
    defineComponent,
    h,
    App,
    ref,
    defineAsyncComponent,
    Component,
} from 'vue'

export function useModal({component, attrs, Modal, modalAttrs}: {
    component: Promise<Component>;
    attrs: Record<string, unknown>;
    Modal: Component;
    modalAttrs: Record<string, unknown>;
}): Promise<Record<string, unknown>> {
    return new Promise((resolve) => {
        const modalDiv = document.createElement('div')
        document.body.appendChild(modalDiv)

        const Data = ref<Record<string, unknown>>({})
        const closeHandler = () => {
            app.unmount()
            document.body.removeChild(modalDiv)
        }

        const submitHandler = () => {
            closeHandler()
            // console.log('ddd', Data.value)
            resolve(Data.value)
        }

        const changeDataHandler = (data: Record<string, unknown>) => {
            Object.keys(data).forEach(key => {
                Data.value[key] = data[key]
            })
        }

        // Создаём стабильную ссылку на асинхронный компонент один раз,
        // чтобы он не пересоздавался при каждом рендере
        const AsyncInnerComponent = defineAsyncComponent(() => component)

        const ModalWrapper = defineComponent({
            render() {
                return h(
                    Modal,
                    {
                        ...modalAttrs,
                        // Блокируем OK, пока форма невалидна (или валидность ещё не известна)
                        okDisabled: !(Data.value && (Data.value as Record<string, unknown>).isValid === true) ,
                        onClose: closeHandler,
                        onSubmit: submitHandler,
                    },
                    {
                        default: () =>
                            h(AsyncInnerComponent, {
                                ...attrs,
                                onChange: changeDataHandler,
                                onSubmit: submitHandler,
                                onClose: closeHandler,
                            }),
                    }
                )
            },
        })

        const app: App = createApp(ModalWrapper)
        app.mount(modalDiv)
    })
}
