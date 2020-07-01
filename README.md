# zeorshotdemo

Step 1: To download the wikipedia data and three pretrained entailment models (RTE, MNLI, FEVER), pls go to this URL: https://drive.google.com/file/d/1ILCQR_y-OSTdgkz45LP7JsHcelEsvoIn/view?usp=sharing

Step 2: Pls put your model path to Line497 in demo.py 

Step 3: 

$python3 backend_cherry.py

then in another termianl tab enter:

curl -d '{"text":"The fox jumped over the fence, and the fence fell down.","models":["MNLI","FEVER"],"labels":["Society", "Health", "Sports"]}' -H 'Content-Type: application/json' -X POST http://localhost:8081/predict