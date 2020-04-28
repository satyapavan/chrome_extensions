function renderlistitem(e) {
//console.log(e);
                
    var v_div_cp = $(document).find('div.Cp');
        
    //console.log(v_div_cp);
    
    for (var i = 0, l = v_div_cp.length; i < l; i++) {
        //console.log(v_div_cp[i]);
        
        var v_tree = $(v_div_cp[i]).find('tbody');
        
        for (var j = 0; j < v_tree.length; j++) {
            //console.log(v_tree[j]);
            
            var v_tr = $(v_tree[j]).children();
            
            for (var k = 0; k < v_tr.length; k++) {
                //console.log(v_tr[k]);
       
                var v_to_me = $(v_tr[k]).find('div.bnj.aZ5.aHR').length + $(v_tr[k]).find('div.bnj.aZ5').length ;
                
                var v_cc_me = $(v_tr[k]).find('div.bnj.bnp.aHR').length + $(v_tr[k]).find('div.bnj.bnp').length ;
                
                var v_bot = $(v_tr[k]).find('div.at').attr("title");
                
                //console.log(v_to_me, v_cc_me, v_bot) ;
                
                // BOT emails are directly assigned to us, which we do not want to be highlighted to blue
                if ( v_bot == "BOTs" ){
                    continue;
                }
                
                if ( v_to_me > 0 ) {
                    $(v_tr[k]).css({"color": "blue"});
                } else if ( v_cc_me > 0) {
                    $(v_tr[k]).css({"color": "blue", "font-style": "italic" });
                    // "background": "lightyellow", "font-size": "large"
                }
            }
        }
    }
}

// };


new MutationSummary({
    callback: renderlistitem,
    queries: [{
        element: "div.Cp"
    }, {
            characterData: !0
    }]
});
        
//console.log($(document).find('div.Cp').length);
