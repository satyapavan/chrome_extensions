function getContent(query) {
    console.debug("Query=" + query);
    console.debug("Number of Childs = " + $(document).find(query).length);

    var content = '';

    if ($(document).find(query).length > 0) {
        var childs = $(document).find(query);
        console.debug(childs);

        for (let index = 0; index < childs.length; index++) {
            const element = childs[index];
            console.debug(index, element);

            content = content + element.outerHTML + '\n';
        }
    }
    console.debug("content=" + content);
    return content;
}

function getQuestion() {
    var query = 'div.main__2Qmtb > div > div > :nth-child(n+2)';
    return getContent(query);
}

function getAnswer(itr) {
    var query = '.questionChoices__oUPbm > li:nth-of-type(' + itr + ') > div > :nth-child(n+2)';
    return getContent(query);
}

function getKey(itr) {
    return $(document).find('.questionChoices__oUPbm > li:nth-of-type(' + itr + ')').attr('data-choice')
}

function renderlistitem(e) {

    if ($(document).find('div.main__2Qmtb > div > div > p:nth-of-type(2)').length <= 0) {
        return;
    }

    // https://app.pluralsight.com/score/skill-assessment/kubernetesdeveloper/summary-review
    var v_skill = location.href.split("/")[5];
    console.log(v_skill);

    //////////////////////////////////////////////
    var v_question = getQuestion();
    console.log("v_question=> " + v_question);

    //////////////////////////////////////////////
    var a1 = getAnswer(1);
    console.log("A1-> " + a1);

    var k1 = getKey(1);
    console.log("k1-> " + k1);

    //////////////////////////////////////////////
    var a2 = getAnswer(2);
    console.log("A2-> " + a2);

    var k2 = getKey(2);
    console.log("k2-> " + k2);

    //////////////////////////////////////////////
    var a3 = getAnswer(3);
    console.log("A3-> " + a3);

    var k3 = getKey(3);
    console.log("k3-> " + k3);

    //////////////////////////////////////////////
    var a4 = getAnswer(4);
    console.log("A4-> " + a4);

    var k4 = getKey(4);
    console.log("k4-> " + k4);

    //////////////////////////////////////////////
    var answer = "";

    if (k1 === "key" || k1 === "key-selected")
        answer = "a";
    else if (k2 === "key" || k2 === "key-selected")
        answer = "b";
    else if (k3 === "key" || k3 === "key-selected")
        answer = "c";
    else if (k4 === "key" || k4 === "key-selected")
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

    chrome.runtime.sendMessage({ payload: data }, function (response) {
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