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
        $('#answer-section').show();
        $('#set-list').show();
    })

    let repNum = 0;
    const addAnswer = () => {
        if (repNum < 1) {
            //console.log("submit works");
            //create variables for: new table row, value of input field, and the rep number.
            const answerRow = $('<tr>').addClass('table-row');
            const inputValue = $('#answer-field').val();
            const repNumber = $('<td>').addClass('rep').text(repNum);
            //create the answer data cell. Add the input Value.
            const answer = $('<td>').addClass('answer').text(inputValue);
            //Append the data cells to the row and the row to the table body.
            $(answerRow).append(repNumber, answer);
            $('tbody').append(answerRow);
            storeRep();
            clearText();
            repNum++;
        } else {
            //console.log("11th time");
            //Repeat the actions above, but for the 10th answer. This avoids the "plus one" problem
            const answerRow = $('<tr>').addClass('table-row');
            const inputValue = $('#answer-field').val();
            const repNumber = $('<td>').addClass('rep').text(repNum);
            const answer = $('<td>').addClass('answer').text(inputValue);
            $(answerRow).append(repNumber, answer);
            $('tbody').append(answerRow);
            storeRep();
            repNum++;
            //Remove the answer section and add a the "submit set" button via buildSetSubmit.
            $('#answer-section').remove();
            buildSetSubmit();
        }
    }

    const storeRep = () => {
        //console.log("button works");
        localStorage.setItem('set1-answers', $('.answer')[repNum].innerHTML);
        //console.log($('.answer')[0].innerHTML);
        storageCheck();
    }

        //Create an array to hold all the answers to set one
    let setOne = [];
    const storageCheck = () => {
        if(localStorage.getItem('set1-answers')) {
            //console.log('set1-answers exists')
            setOne.push(localStorage.getItem('set1-answers'));
        }
        console.log(setOne);
    }

    const clearText= () => {
        $('#answer-field').val('');
    }

    const buildSetSubmit = () => {
        const setSubmitBtn = $('<button>');
        setSubmitBtn.attr('type', 'button');
        setSubmitBtn.attr('id', 'submit-set');
        setSubmitBtn.text('Submit Set');
        $('#set-list').append(setSubmitBtn);
        //set the open modal even listener
        $('#submit-set').on('click', openModalOne);
    }

    //create a variable for the Set One Modal and the exit button,
    const setOneModal = $('#save-modal');
    const closeBtn = $('#exit');
    //create a function to show the modal
    const openModalOne = () => {
        setOneModal.show();
    }
    // //create a function to close the modal
    // const closeModalOne = () => {
    //     setOneModal.hide();
    // }
    // //set the close modal event listener
    // closeBtn.on('click', closeModalOne);
    
    //set event listener on the Submit button so moves the answer to the list
    $('#submit').on('click', addAnswer);

    // //Experimenting with localStorage
    // const arrSetOne = [];
    // const addSet = () => {
    //     //getData
    //     //arrSetOne.push($('.rep').val());
    //     arrSetOne.push($('.answer').val());
    // }

    // localStorage.setItem("", JSON.stringify(arrSetOne))



     //Have a modal come up on Finish Set click
     //Give modal two buttons one to save and continue. One to save and quit.
    
});