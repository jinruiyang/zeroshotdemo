
var label_dic = {
        "topic": ['society', 'science', 'health', 'education', 'computers'],
        "emotion": ['love', 'joy', 'anger', 'disgust', 'fear', 'surprise'],
        "situation": ['search', 'evacuation', 'infrastructure', 'utilities', 'water', 'shelter'],
        "covid-19": ['medical', 'policy', 'travelban', 'health', 'virus']
    }
var text_dic = {
        "When is Thanksgiving celebrated in Canada?": "Syrian refugees at Jordan border are undergoing hardships due to lack of water. Massive bushfires are heard at North Alberta in Canada. About 88,000 people had to be evacuated from that area\n" +
            "shelter infra\tA forest area of about 400,000 hectares had been burnt out. Massive property destructions have happened at places like Macware. The authorities have instructed the people who have been evacuated from the bushfire areas to drink boiled water and to have in stock adequate essential goods and medicines till the end of June. The damages at Macware area due to the bushfires seem to be devastating",
        "The Christian Music field.": "the gono kalayan trust ( gkt ) , which works to improve the incomes of poor farmers and is supported by christian aid, is helping to evacuate people stranded by the rising waters @-@ even though its own offices have been flooded .",
        "In the US , the threshold for gold is half a million.": "in the us , a texas nurse infected with ebola after caring for a liberian man who died from the disease no longer has the virus, her family said.",
        "Sometimes I can't even believe my life.": "Perhat Tursun Perhat Tursun Yarghol I am nonproductive but I am not a dishonored person. I am gonna say that I am not gonna praise you, Perhat Tursun. I would rather curse your weightless verses cold like Germans and like the castle Kafka was not able to get in than praise you, oh Perhat Tursun. I laugh at the smiley poor guys and stop suddenly after that... you made me look bad to the world. You poured the condom in the Tarim river into my brain. Why did you change the pattern of Uyghur poetry that always praises others? Who wants to sit next to you if you do that? You make me turn into a pious man and I am afraid of thinking about you as if I fear water. I am in the hospital because of this serious paradox. Of Perhat Tursun , you created my heart condition. I would understand a little bit if it is a gloomy poem but this looks like a foggy poem. He lived as who he was, didn't he? I liked it. Anybody want to play paradox? Let's play paradox, come on, if you are not concerned about being mentally ill. Let me keep doing. How to call this? Is that a poem? muhlis0998 23:21 5-1-2016 posted time Anybody want to play paradox? Being a mental patient ... You begin first and let's work together if it is ok Of Perhat Tursun , you created my heart condition. The last part is greatly composed. I wish more success for Yarghol's writing. For the readers: Yarghol, look at the parts of the works that you felt unnecessary and what is there is the absolute world you will definitely go to very soon. Learn the difference between word and talk. Just stick with the word and undress limitlessly in the desert of the meaning. Trust the poet who does not stay in the destination. He more and constantly talk about sex, darkness, and death Writer, it might be you that he was cursing. Keep away for what you got used to and who you love. Turn your eyeballs into poisonous arrows and your aim to shameless praises. You should understand that you can learn nothing from us. Dive into our colors and blossom up in our voices and white bushes but forget us for the significance of us. Something like that, Yarghol , I am afraid of something and anxious about something. I feel myself lonely like the moon and powerless like the widowed aunty in the village. Although I know poets die without seeing morning light, I still seek comfort from the verses about lights. I am satisfied with lying and betrayals. Please come, sell me slowly and sneakily. Block the sun that is not straight ever and take my bulky ethereality. Flame my last myths. If my inner organs did not resist the nights and my anxiousness did not warm up January, my stone like hard debts, an unknown someone did not step down on my shoulder, how my life would become miserable. I also feel myself extra like an abandoned gland and feel myself passionate like winter birds. I love the world with some kind of poor emotion... and I believe that is a betrayal for the soul writing poems in this time. I wait for something and seek comfort from something. Maybe I expected a death or a life after the death.."
    }

$("#btn1").click(function () {
    predict();
});

$("#buttonLabel").on('click', 'a', function (event) {
    var key = this.textContent.toLowerCase()

    var list = label_dic[key]

    $("#center").html(
        $.map(list, function(item) {
            return '<input type="text" value="' + item + '" >';
        }).join('')
    )
});

$("#buttonText").on('click', 'a', function (event) {
    var key = this.textContent.toLowerCase()

    var text = text_dic[key]

    $("#textarea-wrapper").html(
       '<textarea id="text" name="text">${text}</textarea>'
)

});



function chooseLabelSet() {


}

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

            $('#center input').each(function(i){
                if(this.value !== null && this.value !== "" && this.value !== undefined) {
                    labels.push(this.value);
                }
            });
            $("input[name^='models']").each(function(i){
                if(this.checked == true){
                     models.push(this.value);
                }

            });

            var dimensions = ["label"] + models

            var data =  {
 	// "text":"The fox jumped over the fence, and the fence fell down.","models":["MNLI","FEVER"],"labels":["Society", "Health", "Sports"]};
            "text": text,
            "labels": labels,
            "models": models
            };


            var reuslut_chart = [
            {label: 'sadness', 'MNLI': 31, 'FEVER': 85.8, 'RTE': 93.7},
            {label: 'happy', 'MNLI': 83.1, 'FEVER': 73.4, 'RTE': 55.1},
            {label: 'sports', 'MNLI': 86.4, 'FEVER': 65.2, 'RTE': 82.5},
            {label: 'health', 'MNLI': 72.4, 'FEVER': 53.9, 'RTE': 39.1},
            {label: '123', 'MNLI': 43.3, 'FEVER': 85.8, 'RTE': 93.7},
            {label: '4', 'MNLI': 83.1, 'FEVER': 73.4, 'RTE': 55.1},
            {label: 's', 'MNLI': 86.4, 'FEVER': 65.2, 'RTE': 82.5},
            {label: 'heh', 'MNLI': 72.4, 'FEVER': 53.9, 'RTE': 39.1}
        ]
            var myChart = echarts.init(document.getElementById('result-chart'));
            // Creating a XHR object
            // let xhr = new XMLHttpRequest();
    console.log('this code is run')
            var url = "/predict";
            myChart.showLoading();
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
                    console.log(json);
                    // json_result = json["json_result"]
                    $("#result").html(JSON.stringify(json))
                    console.dir(json);
                    console.log("start charting");
                    myChart.hideLoading();
                    myChart.setOption({
                        title: {
                            text: 'Confidence \%',
                            subtext: 'Sort by Average'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        legend: {

                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        dataset: {
                            dimensions: ["label", "MNLI", "FEVER", "RTE", "Average"],
                            // dimensions: dimensions, 

                            // source: [
                            //     {"label": "sadness", "Average": 22.886, "MNLI": 4.373, "FEVER": 62.951, "RTE": 1.335},
                            //     {"label": "happy", "Average": 22.958, "MNLI": 2.265, "FEVER": 65.422, "RTE": 1.186},
                            //     {"label": "health", "Average": 40.464, "MNLI": 9.415, "FEVER": 81.701, "RTE": 30.275},
                            //     {"label": "sports", "Average": 48.192, "MNLI": 50.021, "FEVER": 84.583, "RTE": 9.971}
                            //     ]
                            source: json,


                        },
                        xAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        yAxis: {
                            type: 'category',
                        },
                        series: [
                            {type: 'bar'},
                            {type: 'bar'},
                            {type: 'bar'},
                            {type: 'bar'}
                        ]
                    });



                    })
                // .then(json =>console.log(json))
                .catch(e => console.log(e));

        }
