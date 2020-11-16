import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import numpy as np
from recommend import MF

# Use a service account
cred = credentials.Certificate('tediadiktuou-firebase.json') # change your certificate
firebase_admin.initialize_app(cred)

db = firestore.client()

users_list = []
airbnbs_list = []

airbnbs_ref = db.collection(u'airbnbs')
airbnbs = airbnbs_ref.stream()

user_ref = db.collection(u'userDetails')
users = user_ref.stream()

ratings_ref = db.collection(u'ratings')
ratings = ratings_ref.stream()

ratings_list = []

for doc in ratings:
    ratings_list.append(doc.to_dict())

print(ratings_list)



for doc in airbnbs:
    print('airbnb_id: {}'.format(doc.id))
    airbnbs_list.append(doc.id)

for doc in users:
    print('user_id: {}'.format(doc.id))
    users_list.append(doc.id)

#print(airbnbs_list)


Matrix = [[0 for x in range(len(users_list))] for y in range(len(airbnbs_list))]

for x in range(len(airbnbs_list)):
    for y in range(len(users_list)):
        sum = 0
        num = 0
        for rating in ratings_list:
            if(airbnbs_list[x] == rating['airbnb_id'] and users_list[y] == rating['user_email']):
                sum = sum + int(rating['rating'])
                num = num + 1
            if(num >= 1):
                Matrix[x][y] = sum/num


R = np.array(Matrix)

mf = MF(R, K=2, alpha=0.1, beta=0.01, iterations=20)

training_process = mf.train()
print(mf.full_matrix())
print(Matrix)

new_matrix = mf.full_matrix()
print(new_matrix[0][0])

for y in range(len(users_list)):
    for x in range(len(airbnbs_list)):
        rec_ref = db.collection('recommendations').document()
        rec_ref.set({
            'airbnb': airbnbs_list[x],
            'rating': new_matrix[x][y],
            'user_email': users_list[y]
        })