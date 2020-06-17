const roundOneQuestion = ["Briefly describe a character who you associate with this word", "Name an occupation that you might associate with this word", "If this word were a character in a comicbook, what would be its defining flaw"]


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

    //DISPLAY THE RANDOMLY GENERATED WORD ALONG WITH ITS DEFINITION (stretch goal -- display ALL the definitions that are also nouns.)
    const displayWord = () => {
        $.ajax(randomWord).then((response) => {
            console.log(response);
            $("#display-word").html(`
            <h2> ${response.word} </h2>
            <h4> <i>${response.results[0].definition}</i> </h4>
            `)
        })
    }

    //Pick a random question from the roundOneQuestion array and display it.
    const pickFirstQuestion = () => {
        let randomNumber = Math.floor((Math.random()) * roundOneQuestion.length);
        $("#question-field").html(`
            <h4 class="question"> ${roundOneQuestion[randomNumber]} </h4>
        `);
        //console.log(roundOneQuestion[randomNumber]);
    }

    const getWord = $("#get-word").on('click', () => {
        displayWord();
        pickFirstQuestion();
    })

    let repNum = 1;

    const addAnswer = () => {
        if (repNum <= 10) {
        event.preventDefault();
        console.log("submit works");
        //create a new table row
        const answerRow = $('<tr>');
        //create the rep # data cell. Add the value of i
        const repNumber = $('<td>').addClass('rep').text(repNum);
        const inputValue = $('#answer').val();
        //create the answer data cell. Add the input Value.
        const answer = $('<td>').addClass('answer').text(inputValue)
        $(answerRow).append(repNumber, answer);
        $('tbody').append(answerRow);
        $('#answer').val('');
        repNum++;
        }
        if (repNum>10) {
            //Have a modal come up
            alert("You've completed your first set")
        }
        
    }

    
    $('#submit').on('click', addAnswer);

    // const answerListener = $('#submit').on('click', () => {
    //         console.log("submit works");
    //         addAnswer();
    //     })

    
});