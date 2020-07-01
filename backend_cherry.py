import cherrypy
from zeroshot_classification import ZeroshotClassification
import json
from demo import load_model, compute_single_label, load_model_to_mem, compute_mutiple_labels

print("")
print("Loading classifer...")
# mnli_classifer = ZeroshotClassification._get_mnli()
# # verb_srl_manager = verb_srl._PredictManager(verb_srl_predictor)
# print(":FEVER")
# fever_classifer = ZeroshotClassification._get_fever()
# # nom_srl_manager = nom_srl._PredictManager(nom_srl_predictor)
# print(":RTE")
# rte_classifer = ZeroshotClassification._get_rte()
# onto_nom_srl_manager = onto_nom_srl._PredictManager(onto_nom_srl_predictor)
global cache
cache = load_model_to_mem()
print("Cached models!")

class MyWebService(object):

    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def predict(self):
        data = cherrypy.request.json
        input_text = data["text"]
        model_list = data["models"]
        label_list= data["labels"]
        all_dic = {}
        # prob = compute_single_label(input_text, label, model, tokenizer)
        for model_name in model_list:
            model = cache[model_name][0]
            tokenizer = cache[model_name][1]
            prob_list = compute_mutiple_labels(input_text, label_list, model, tokenizer)
            all_dic[model_name] = prob_list

        return "It is working! {} ".format(all_dic)


if __name__ == '__main__':
    print("Starting rest service...")
    config = {'server.socket_host': '0.0.0.0'}
    cherrypy.config.update(config)
    cherrypy.config.update({'server.socket_port': 8081})
    cherrypy.quickstart(MyWebService())
