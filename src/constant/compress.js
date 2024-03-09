import { render } from "@testing-library/react"

export function compress (imageFile, cb ) {
    const reader = new FileReader
    reader.readAsDataURL(imageFile)
    reader.onload = (event) => {
        const imageUrl = event.target.result
        const image = document.createElement("img")
        image.src = imageUrl
        image.onload = (e) =>{
            const canvas = document.createElement("canvas")
            const WIDTH = 400
            const ratio = WIDTH / e.target.width
            canvas.width = WIDTH
            canvas.height = e.target.height * ratio

            const context = canvas.getContext("2d")
            context.drawImage(image, 0, 0, canvas.width, canvas.height)

            const newImageUrl = canvas.toDataURL("image/jpeg", 90) 
            
            const {dataArr,mime} =  urltoFile(newImageUrl)
        
           const file = new File([dataArr], imageFile.name, {type:mime})
            cb(file)
            
        }  
       
    }
}

const urltoFile = (url) =>{
    const arr = url.split(",")
    const mime = arr[0].match(/:(.*?);/)[1]
    const data = arr[1]

    const dataStr = atob(data)
    let length = dataStr.length
    const dataArr = new Uint8Array(length)

    while(length--){
        dataArr[length] = dataStr.charCodeAt(length)
    }
 
    return {dataArr,mime}
}

export const showFile = (file) =>{
    return file
}