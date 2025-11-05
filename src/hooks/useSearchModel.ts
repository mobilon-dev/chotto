import { ref } from 'vue';

interface SearchModel {
    id: string
    text: string
}

const searchModels = ref<SearchModel[]>([])

export const useSearchModel = (outId : string) => {

    const index = ref<number>(0)
    
        const foundModel = searchModels.value.find(({id}) => id == outId)
        if (foundModel != undefined){
            index.value = searchModels.value.indexOf(foundModel)
        } 
        else {
            searchModels.value.push({
                id: outId,
                text: '',
            })
            index.value = searchModels.value.length - 1
        }

    const getModel = () => {
        return searchModels.value[index.value]
    }

    return {getModel}
}