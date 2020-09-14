function renderlistitem(e) {
                    

    if($(document).find('div.main__2Qmtb > div > div > p:nth-of-type(2)').length <= 0 ){
        return;
    }

        // https://app.pluralsight.com/score/skill-assessment/kubernetesdeveloper/summary-review
        var v_skill = location.href.split("/")[5];
        console.log(v_skill);

        var v_question ;

        if( $(document).find('div.main__2Qmtb > div > div > p:nth-of-type(2)').length > 0) {
            v_question = $(document).find('div.main__2Qmtb > div > div > p:nth-of-type(2)')[0].outerHTML;
            console.log("v_question=> " + v_question);
        }

        var a1, k1;

        if( $(document).find('.questionChoices__oUPbm > li:nth-of-type(1) > div > p ').length > 0) {
            a1 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(1) > div > p ')[0].outerHTML;
            console.log("A1-> " + a1);
    
            k1 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(1)').attr('data-choice');
            console.log("k1-> " + k1);    
        }

        var a2, k2;
        
        if( $(document).find('.questionChoices__oUPbm > li:nth-of-type(2) > div > p ').length > 0) {
            a2 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(2) > div > p ')[0].outerHTML;
            console.log("A2-> " + a2);
    
            k2 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(2)').attr('data-choice');
            console.log("k2-> " + k2);    
        }

        var a3, k3;
        
        if( $(document).find('.questionChoices__oUPbm > li:nth-of-type(3) > div > p ').length > 0) {
            a3 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(3) > div > p ')[0].outerHTML;
            console.log("A3-> " + a3);
    
            k3 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(3)').attr('data-choice');
            console.log("k3-> " + k3);    
        }

        var a4, k4;
        
        if( $(document).find('.questionChoices__oUPbm > li:nth-of-type(4) > div > p ').length > 0) {
            a4 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(4) > div > p ')[0].outerHTML;
            console.log("A4-> " + a4);
    
            k4 = $(document).find('.questionChoices__oUPbm > li:nth-of-type(4)').attr('data-choice');
            console.log("k4-> " + k4);    
        }

        var answer = "";

        if(k1 === "key" || k1 === "key-selected") 
            answer = "a";
        else if(k2 === "key" || k2 === "key-selected") 
            answer = "b";
        else if(k3 === "key" || k3 === "key-selected") 
            answer = "c";
        else if(k4 === "key" || k4 === "key-selected") 
            answer = "d";

        var data = `{
 "question": "${window.btoa(unescape(encodeURIComponent(v_question)))}",
 "answers": {
     "a": "${window.btoa(unescape(encodeURIComponent(a1)))}",
     "b": "${window.btoa(unescape(encodeURIComponent(a2)))}",
     "c": "${window.btoa(unescape(encodeURIComponent(a3)))}",
     "d": "${window.btoa(unescape(encodeURIComponent(a4)))}"
 },
 "correctAnswer": "${answer}",
 "skill": "${v_skill}"
}`
        ;

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