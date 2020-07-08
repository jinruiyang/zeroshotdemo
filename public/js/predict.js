$("#btn1").click(function () {
    predict();
});


function predict(){

            // let result = document.querySelector('.result');
            // let text = document.querySelector('#text');
            // let labels = document.querySelector('#labels');
            // let models = document.querySelector('#models');

            let result = "it is work";
            let text = $("#text").val();
            //let labels = ["Society", "Health", "Sports"];
            //let models = ["MNLI","FEVER"];

            let labels = [];
            let models = [];

            $("input[name^='labels']").each(function(i){
                if(this.value !== null && this.value !== "" && this.value !== undefined) {
                    labels.push(this.value);
                }
            });
            $("input[name^='models']").each(function(i){
                if(this.checked == true){
                     models.push(this.value);
                }

            });

            var data =  {
 	// "text":"The fox jumped over the fence, and the fence fell down.","models":["MNLI","FEVER"],"labels":["Society", "Health", "Sports"]};
            "text": text,
            "labels": labels,
            "models": models}
            // Creating a XHR object
            // let xhr = new XMLHttpRequest();
    console.log('this code is run')
            var url = "/predict";
            fetch(url,
                {
                    method: 'POST',
                    body : JSON.stringify(data),
                   headers: {"Content-Type" : "application/json"}
                    // //after succuss
                    // success : function(result) {
                    //     console.log(result);
                    //     $("#result").html(result);
                    // },
                    // error: function (error) {
                    //     console.log("error");
                    // }
                }
            ).then(resp => resp.json())
                .then(json => {
                    console.log(json)
                    $("#result").html(json)
                })
                // .then(json =>console.log(json))
                .catch(e => console.log(e));

            // // open a connection
            // xhr.open("POST", url, true);
            //
            // // Set the request header i.e. which type of content you are sending
            // xhr.setRequestHeader("Content-Type", "application/json");
            //
            // // Create a state change callback
            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState === 4 && xhr.status === 200) {
            //
            //         // Print received data from server
            //         result.innerHTML = this.responseText;
            //
            //     }
            // };

            // Converting JSON data to string
            // var data = JSON.stringify({ "text": text.value, "labels": labels.value, "models": models.value });
            //
            // // Sending data with the request
            // xhr.send(data);
        }

