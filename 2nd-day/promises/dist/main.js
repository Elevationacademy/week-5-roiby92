// // //Callback Hell -> the situation Promises come to fix
// // $.get('/randomWord', function (word) {
// //     $.get(`/synonyms/${word}`, function (synonyms) {
// //         $.get(`/sentiment/${word}`, function (sentiment) {
// //             console.log(`
// //             The word ${word} has a 
// //             ${sentiment === 1 ? "Positive" : sentiment === -1 ? "Negative" : "Neutral"} sentiment,
// //             its synonyms are: ${synonyms}`)
// //         })
// //     })
// // })
// // //even worst Callback Hell
// // $.ajax({
// //     method: "GET",
// //     url: "/randomWord",
// //     success: function (word) {
// //         $.ajax({
// //             method: "GET",
// //             url: `/synonyms/${word}`,
// //             success: function (synonyms) {
// //                 $.ajax({
// //                     method: "GET",
// //                     url: `sentiment/${word}`,
// //                     success: function (sentiment) {
// //                         console.log(`
// //                         The word ${word} has a 
// //                         ${sentiment === 1 ? "Positive" : sentiment === -1 ? "Negative" : "Neutral"} sentiment,
// //                         its synonyms are: ${synonyms}`)
// //                     },
// //                     error: function (err) {
// //                         console.log(err)
// //                     }
// //                 })
// //             },
// //             error: function (err) {
// //                 console.log(err)
// //             }
// //         })
// //     },
// //     error: function (err) {
// //         console.log(err)
// //     }
// // })


// // Promise

// let p = $.get('/randomWord') //notice that we don't use a callback in this case! We can, but this is what we're avoiding.
// // console.log(p) // in the log, the object we'll see is a promis object
// // console.log(p.state())//prints pending

// //to extrect the data we using the .then(function()) method
// p.then(function (word) {
//     console.log(word)
// })

// //spot check 1
// $.get('/randomWord').then(function (word) {
//     console.log(word);
// })

// //spot check 2

// const spotPromise = $.get('/sentiment/Ploy')

// spotPromise.then(function (result) {
//     console.log(result);
// })


// //Chaining

// $.get('/randomWord')
//     .then(function (word) {
//         return $.get(`/synonyms/${word}`)
//     })
//     .then(function (synonyms) {
//         console.log(synonyms)
//     })


// // Promise.all
// $.get('/randomWord')
//     .then(function (word) {
//         let synonymsPromise = $.get(`/synonyms/${word}`)
//         let sentimentPromise = $.get(`/sentiment/${word}`)
//         Promise.all([synonymsPromise, sentimentPromise])
//             .then(function (results) {
//                 console.log(results)
//             })
//     })

// const printResults = function (word, synonyms, sentiment) {
//     console.log(`
//             The word ${word} has a 
//             ${sentiment === 1 ? "Positive" : sentiment === -1 ? "Negative" : "Neutral"} sentiment,
//             its synonyms are: ${synonyms}`
//     )
// }

// $.get('/randomWord')
//     .then(function (word) {
//         let synonymsPromise = $.get(`/synonyms/${word}`)
//         let sentimentPromise = $.get(`/sentiment/${word}`)
//         Promise.all([synonymsPromise, sentimentPromise])
//             .then(function (results) {
//                 printResults(word, results[0], results[1])
//             })
//     })



// ////////To detach our async calls (mostly GET requests) from callbacks (example below)
// class APIManager {
//     fetch() {
//         return $.get('/data')
//     }
// }

// class Renderer {
//     render(dataPromise) {
//         dataPromise.then(function (data) {
//             $("#body").append(`<div>${data}</div>`)
//         })
//     }
// }

// const apiManager = new APIManager()
// const renderer = new Renderer()

// let initialDataPromise = apiManager.fetch()
// renderer.render(initialDataPromise) //initial page load

// $(".some-thing").on("click", function () {
//     let newDataPromise = apiManager.fetch()
//     renderer.render(newDataPromise)
// })


//ex1

// $.get('/randomWord').then(function (word) {
//     console.log(word);
//     return $.get(`https://www.googleapis.com/books/v1/volumes?q=title:${word}`)
// }).then(function (result) {
//     console.log(result);
// })

const wordPromise = $.get('/randomWord')
wordPromise.then(function (word) {
    const bookPromise = $.get(`https://www.googleapis.com/books/v1/volumes?q=title:${word}`)
    const gifPromise = $.get(`http://api.giphy.com/v1/gifs/search?q=${word}&api_key=Uz98kxLMigspHK47y4qiiDmzIMpgpenk&limit=1`)
    Promise.all([bookPromise, gifPromise]).then(function (results) {
        $('body').append(`
        <div>
        <p>${results[0].items[0].volumeInfo.title}</p>
        <iframe src="${results[1].data[0].embed_url}"></iframe>
        </div>
        `)
    })
})

//let synonymsPromise = $.get(`/synonyms/${word}`)
//         let sentimentPromise = $.get(`/sentiment/${word}`)
//         Promise.all([synonymsPromise, sentimentPromise])
//             .then(function (results) {
//                 printResults(word, results[0], results[1])
//             })