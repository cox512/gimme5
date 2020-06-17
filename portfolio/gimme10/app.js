$(() => {
    //WORDSAPI SET-UP. CONTACT FOR WORD.
    const randomWord = {
        "async": true,
        "crossDomain": true,
        "url": "https://wordsapiv1.p.rapidapi.com/words/?partOfSpeech=noun&lettersMax=7&hasDetails=synonyms,also&random=true",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "6bdd5dbc83mshd1a0b82422d6f4bp1fb182jsn320ccba670a2"
        }
    }
    //SET A VARIABLE FOR THE GETWORD COMMAND
    let getWord = $.ajax(randomWord);

    //DISPLAY THE RANDOMLY GENERATED WORD ALONG WITH ITS DEFINITION (stretch goal -- display ALL the definitions that are also nouns.)
    const displayWord = () => {
        getWord.then((response) => {
            console.log(response);
            $("#display-word").addClass('new-word').html(`
            <h2> ${response.word} </h2>
            <h4> <i>${response.results[0].definition}<i> </h4>
            `)
        })
    }


    const button = $("#get-word").on('click', () => {
        displayWord();
        //displayDef();
    })

});