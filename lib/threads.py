
## ----- IMPORTS -----

import Adafruit_ADS1x15
import Adafruit_DHT
from datetime import datetime, timedelta
from threading import Thread
import time
import ast
import os
import re
import random
import math

import network
import lighting
import heating
import schedule
import IOPiPlus1
import appliances



## ----- GLOBAL VARIABLES -----

networkSpeeds = [0.0]*3
measured = {'kitchen': {'light': 0, 'temperature': 0, 'humidity': 0, 'DHTpin': 4, 'lightChip':(0x48, 0)},
            'bedroom2': {'light': 0, 'temperature': 0, 'humidity': 0, 'DHTpin': 17, 'lightChip':(0x48, 1)},
            'lounge': {'light': 0, 'temperature': 0, 'humidity': 0, 'DHTpin': 27, 'lightChip':(0x48, 2)},
            'bathroom': {'light': 0, 'temperature': 0, 'humidity': 0, 'DHTpin': 22, 'lightChip':(0x49, 0)},
            'bedroom1': {'light': 0, 'temperature': 0, 'humidity': 0, 'DHTpin': 18, 'lightChip':(0x49, 1)},
            'hall': {'light': 0, 'temperature': 0, 'humidity': 0, 'DHTpin': 23, 'lightChip':(0x49, 2)},
            'average': {'light': 0, 'temperature': 0, 'humidity': 0}}
pcPingStat = False



## ----- MEMORY VARIABLES -----

scheduleRestart = False

def restartPrompt(x):
    global scheduleRestart
    if x == 'schedule':
        scheduleRestart = True
    else:
        pass
    return None



## ----- MEASURED ROOM VALUES -----

def measuredValue(room, variable):
    return measured[room][variable]

def getMeasuredRoomValues():
    global measured
    amplify = 1
    while True:
        lightHolder = 0
        lightCount = 0
        temperatureHolder = 0
        temperatureCount = 0
        humidityHolder = 0
        humidityCount = 0
        for room in measured:
            if room != 'average':
                try:
                    dht22 = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, measured[room]['DHTpin'])
                    holdHumidity = float(dht22[0])
                    holdTemperature = float(dht22[1])
                    if 0 <= holdHumidity <= 100 and 0 <= holdTemperature <= 50:
                        measured[room]['humidity'] = holdHumidity
                        measured[room]['temperature'] = holdTemperature
                        temperatureHolder += measured[room]['temperature']
                        temperatureCount += 1
                        humidityHolder += measured[room]['humidity']
                        humidityCount += 1
                    else:
                        measured[room]['humidity'] = 0
                        measured[room]['temperature'] = 0
                except:
                    measured[room]['humidity'] = 0
                    measured[room]['temperature'] = 0
                for room in measured:
                    if room != 'average':
                        try:
                            measured[room]['light'] = float(Adafruit_ADS1x15.ADS1015(address=measured[room]['lightChip'][0]).read_adc(measured[room]['lightChip'][1], gain=amplify))/2047*100
                            lightHolder += measured[room]['light']
                            lightCount += 1
                        except:
                            measured[room]['light'] = 0
                    time.sleep(0.5)
                measured['average']['light'] = int(float(lightHolder)/float(lightCount))
                time.sleep(5)
        measured['average']['temperature'] = int(float(temperatureHolder)/float(temperatureCount))
        measured['average']['humidity'] = int(float(humidityHolder)/float(humidityCount))



## ----- NETWORK STATUS -----

def getNetworkSpeeds():
    global networkSpeeds
    while True:
        time.sleep(120)
        try:
            complete = os.popen('python /home/pi/webserver/lib/speedtest.py').read()
            newComplete = complete.split('\n')
            required = []
            required.append(newComplete[4])
            required.append(newComplete[6])
            required.append(newComplete[8])
            newRequired = []
            for i in required:
                newRequired.append(i.split(':'))
            for i in newRequired:
                i.pop(0)
            secondList = []
            for i in newRequired:
                secondList.append(''.join(i))
            finalList = []
            for i in secondList:
                finalList.append((i.split(' '))[1])
            networkSpeeds[0] = round(float(finalList[0]),0)
            networkSpeeds[1] = round(float(finalList[1]),0)
            networkSpeeds[2] = round(float(finalList[2]),0)
        except:
            networkSpeeds = [0.0]*3
        time.sleep(900)

def networkSpeedStatus(x):
    global networkSpeeds
    value = networkSpeeds[x]
    return value

def pingPC():
    global pcPingStat
    pcIpAddress = ## REMOVED
    while True:
        time.sleep(5)
        try:
            if os.system('ping -c 1 ' + str(pcIpAddress)) == 0:
                pcPingStat = True
            else:
                pcPingStat = False
        except:
            pass

def pcPingStatus():
    return pcPingStat
        
    

## ----- SYSTEM POWER -----

def restart():
    print ('-'*50 + '\n')*3 + '            THE SERVER IS REBOOTING NOW!!!\n' + ('-'*50 + '\n')*3
    time.sleep(1)
    os.system('shutdown -r now')
    return

def shutDown():
    print ('-'*50 + '\n')*3 + '          THE SERVER IS SHUTTING DOWN NOW!!!\n' + ('-'*50 + '\n')*3
    time.sleep(1)
    os.system('shutdown -h now')
    return



## ----- LIGHTS STATUS -----

def lightsStatus():
    global lightsRelayStatus
    value = lightsRelayStatus
    return value



## ----- SCHEDULE -----

def importScheduleData(x):
    ## READS TEXT FILES AND RETURNS SINGLE DICTIONARY CONTAINING ALL DATA
    f = open('/home/pi/webserver/data/scheduleTimes.txt')
    times = f.read()
    f.close()
    f = open('/home/pi/webserver/data/scheduleExtra.txt')
    extra = f.read()
    f.close()
    f = open('/home/pi/webserver/data/scheduleCheckboxes.txt')
    checkboxes = f.read()
    f.close()
    f = open('/home/pi/webserver/data/schedulePause.txt')
    pause = f.read()
    f.close()
    timesD = ast.literal_eval(times)
    actualTimes = dict(timesD.items())
    for i in timesD:
        if timesD[i] != '':
            if len(timesD[i]) == 4:
                inputTime = '0' + timesD[i]
            else:
                inputTime = timesD[i]
            hour = inputTime[:2]
            minute = inputTime[-2:]
            actualTimes[i] = str(hour + minute)
    extraD = ast.literal_eval(extra)
    checkboxesD = ast.literal_eval(checkboxes)
    data = dict(actualTimes.items() + extraD.items() + checkboxesD.items())
    data['paused'] = pause
    if x == 'times':
        return actualTimes
    elif x == 'extra':
        return extraD
    elif x == 'checkboxes':
        return checkboxesD
    else:
        return data

def scheduleCompleted():
    ## RETURNS DICTIONARY OF ALL DATA SET TO FALSE
    complete = dict(importScheduleData('times').items())
    for i in complete:
        complete[i] = False
    return complete

def timeNow():
    ## RETURNS 4 DIGIT INTEGER OF CURRENT TIME
    current = str((str(datetime.now()).split(' '))[1]).split(':')
    combined = str(current[0])+str(current[1])
    if len(combined) == 3:
        return '0' + combined
    else:
        return combined

def scheduleRoutine(time, events, lightLevel):
    ## INITIATES ROUTINE
    routines = {}
    for key in events:
        if time in key:
            if events[key] == 'True':
                routines[key] = events[key]
    if routines == {}:
        return
    ## CHECKS ROUTINE FOR DUPLICATES
    devicesOn = []
    devicesOff = []
    goodRoutines = []
    badRoutines = []
    finalRoutines = []
    finalInstruction = {}
    for key in routines:
        if 'On' in key:
            devicesOn.append(key.split('On')[0])
        if 'Off' in key:
            devicesOff.append(key.split('Off')[0])
    for key in devicesOn:
        if key not in devicesOff:
            goodRoutines.append(key)
        else:
            badRoutines.append(key)
    for key in devicesOff:
        if key not in devicesOn:
            goodRoutines.append(key)
        else:
            badRoutines.append(key)
    for key in goodRoutines:
        for otherKey in routines:
            if key in otherKey:
                finalRoutines.append(otherKey.split('Check')[0])
    for key in finalRoutines:
        if 'On' in key:
            finalInstruction[key.split('On')[0]] = 'on'
        if 'Off' in key:
            finalInstruction[key.split('Off')[0]] = 'off'
    ## SPLITS ROUTINE INTO BASIC FUNCTIONS
    lights = {}
    heaters = {}
    devices = {}
    for key in finalInstruction:
        if 'Light' in key:
            lights[key.split('Light')[0]] = finalInstruction[key]
        if 'Heater' in key:
            heaters[key.split('Heater')[0]] = finalInstruction[key]
        if 'pc' in key:
            devices[key] = finalInstruction[key]
    th = Thread(target=lighting.scheduleRun(lights, lightLevel))
    th.setDaemon(True)
    th.start()
    th = Thread(target=heating.scheduleRun(heaters))
    th.setDaemon(True)
    th.start()
    th = Thread(target=appliances.scheduleRun(devices))
    th.setDaemon(True)
    th.start()
    return

def runSchedule():
    global scheduleRestart
    data = importScheduleData('all')
    routines = importScheduleData('times')
    events = importScheduleData('checkboxes')
    complete = scheduleCompleted()
    while True:
        dayOfWeek = time.strftime('%A').lower()
        Morning = dayOfWeek + 'Morning'
        Evening = dayOfWeek + 'Evening'
        Weekend = dayOfWeek + 'Weekend'
        if data['paused'] == 'running':
            for i in [ k for k, v in complete.items() if dayOfWeek not in k]:
                complete[i] = False
            if complete[Morning] == False:
                if timeNow() == data[Morning]:
                    complete[Morning] = True
                    scheduleRoutine('Morning', events, data['morningLightLevel'])
            if complete[Evening] == False:
                if timeNow() == data[Evening]:
                    complete[Evening] = True
                    scheduleRoutine('Evening', events, data['eveningLightLevel'])
            if complete[Weekend] == False:
                if timeNow() == data[Weekend]:
                    complete[Weekend] = True
                    scheduleRoutine('Weekend', events, data['weekendLightLevel'])
        if scheduleRestart == True:
            scheduleRestart = False
            runSchedule()
        else:
            time.sleep(1)
