import pymongo
import datetime 

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["boostMind"]
mycol = mydb["newtests"]
currentTime = datetime.datetime.now()


myqueryStartTime = {"startDateTime": { "$lte": currentTime}}
newvaluesStart = { "$set": { "isActive": "1" } }

# myqueryEndTime = {"endDateTime": { "$lte": currentTime}}
# newvaluesEnd = { "$set": { "isActive": "0" } }

try:
    print("Updating the test")
    mycol.update_one(myqueryStartTime, newvaluesStart)
    #mycol.update_one(myqueryEndTime, newvaluesEnd)
    print("Test updated successfully")
except:
    print("Error in updating test")


