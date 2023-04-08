const someCallback = (callback) => {
    setTimeout(() => {
        callback(undefined,"run it")
    },2000)
}

someCallback((error,result) => {
    if(error){
        return console.log(error)
    }

    console.log(result)
})  