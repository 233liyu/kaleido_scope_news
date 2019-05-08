import pandas as pd
import json

if __name__ == "__main__":
    news = pd.read_csv("/Users/lee/Downloads/articles1.csv", nrows=20, na_values="null")
    # json.dumps()
    news = news.drop(columns='Unnamed: 0')
    

    file_a = open("./news.json", "w")
    file_a.write(news.to_json(orient="records"))

    