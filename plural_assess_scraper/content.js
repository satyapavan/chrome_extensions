function renderlistitem(e) {
                    

    if($(document).find('div.main__2Qmtb > div > div > p:nth-of-type(2)').length <= 0 ){
        return;
    }
        var v_question ;

        if( $(document).find('div.main__2Qmtb > div > div > p:nth-of-type(2)').length > 0) {
            v_question = $(document).find('div.main__2Qmtb > div > div > p:nth-of-type(2)').text();
        }

        console.log("v_question=> " + v_question);


        var a1 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(1) > div > p ').text();
        console.log("A1-> " + a1);

        var k1 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(1)').attr('data-choice');
        console.log("k1-> " + k1);
      

        var a2 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(2) > div > p ').text();
        console.log("A2-> " + a2);

        var k2 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(2)').attr('data-choice');
        console.log("k2-> " + k2);


        var a3 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(3) > div > p ').text();
        console.log("A3-> " + a3);

        var k3 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(3)').attr('data-choice');
        console.log("k3-> " + k3);


        var a4 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(4) > div > p ').text();
        console.log("A4-> " + a4);

        var k4 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(4)').attr('data-choice');
        console.log("k4-> " + k4);

        var answer = "";

        if(k1 === "key" || k1 === "key-selected") 
            answer = "a";
        else if(k2 === "key" || k2 === "key-selected") 
            answer = "b";
        else if(k3 === "key" || k3 === "key-selected") 
            answer = "c";
        else if(k4 === "key" || k4 === "key-selected") 
            answer = "d";

        var data = '{'  + '\n'
        + " question: " + '"' + v_question.split('\n')[0] + '",' + '\n'
        + ' answers: {' + '\n'
        + '     a: ' + '"' + a1.split('\n')[0] + '",' + '\n'
        + '     b: ' + '"' + a2.split('\n')[0] + '",' + '\n'
        + '     c: ' + '"' + a3.split('\n')[0] + '",' + '\n'
        + '     d: ' + '"' + a4.split('\n')[0] + '"' + '\n'
        + ' },' + '\n'
        + ' correctAnswer: ' + '"' + answer + '"' + '\n'
        + '}'
        ;

        var v_assessmentTitle = $(document).find('.assessmentTitle__1nfEH').text();
        console.log("Data=" + data);

        chrome.runtime.sendMessage({payload: data }, function(response) {
            console.log(response.farewell);
        });

}
    
    // };
    
    
    new MutationSummary({
        callback: renderlistitem,
        queries: [{
            element: "div.main__2Qmtb"
        }, {
                characterData: !0
        }]
    });    