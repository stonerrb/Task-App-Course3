const someCallback = new Promise((resolve,reject) => {
 setTimeout(() => {
    resolve("Success!!");
    reject("Error")
 },2000)
})

someCallback.then((result) => {
    console.log("Success",result)
}).catch((error) => {
    console.log("Failed",error)
})