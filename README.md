# zeroshotdemo

Step 1: Download three pretrained entailment models (RTE, MNLI, FEVER), pls go to this URL: https://drive.google.com/file/d/1ILCQR_y-OSTdgkz45LP7JsHcelEsvoIn/view?usp=sharing

Step 2: Download ESA word2id.json and matrix from the URL https://drive.google.com/file/d/18I-cSzhEoKgfCEfpnWKq2yEhES7_roaS/view?usp=sharing

Step 3 : 

$ CUDA_VISIBLE_DEVICES=2,3 python3 backend_cherry.py --ZEROSHOT_MODELS <the path of FOLDER you save pretrained mopdel from step 1> --ZEROSHOT_RESOURCES <the path of FOLDER you save ESA from step 2>  

Note: Please keep eye on just the folder path, not the files path. 

Step 4:
then in another termianl tab enter, you can Check backend with terminal:

curl -d '{"text":"The fox jumped over the fence, and the fence fell down.","models":["MNLI","FEVER", "RTE", "ESA"],"labels":["Society", "Health", "Sports"], "descriptions":[]}' -H 'Content-Type: application/json' -X POST http://localhost:8081/predict

Step 5:
 
Open url http://localhost:8081/ in the browser, then you can play with it!
