FROM mongo

COPY initUsers.json ./
COPY initPictures.json ./

CMD mongoimport --host mongodb --db ugram --collection users --type json --file /initUsers.json --jsonArray \
&& mongoimport --host mongodb --db ugram --collection pictures --type json --file /initPictures.json --jsonArray

