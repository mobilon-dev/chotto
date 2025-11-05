import { ref } from 'vue';

interface Theme {
    id: string
    theme: string
}

const themes = ref<Theme[]>([])

export const useTheme = (outId : string) => {

    const index = ref<number>(0)

    const foundTheme = themes.value.find(({id}) => id == outId)
    if (foundTheme != undefined){
        index.value = themes.value.indexOf(foundTheme)
    } 
    else {
        themes.value.push({
            id: outId,
            theme: '',
        })
        index.value = themes.value.length - 1
    }
    
    const getTheme = () => {
        return themes.value[index.value]
    }

    return {getTheme}
}
