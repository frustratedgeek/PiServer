
### ----- IMPORTS -----

from datetime import datetime, timedelta
from threading import Thread
import time

import IOPiPlus1
import threads



### ----- GLOBAL VARIABLES -----

heatersStatus = [1]*8
relayTimeDelay = 0.5
heaterUsage = False



### ----- HEATER CONTROL FUNCTIONS -----

def bathroom():
    IOPiPlus1.pulse(1)
    return
def lounge():
    IOPiPlus1.pulse(3)
    return
def bedroom1():
    IOPiPlus1.pulse(5)
    return
def bedroom2():
    IOPiPlus1.pulse(7)
    return
def kitchen():
    IOPiPlus1.pulse(9)
    return
def hall():
    IOPiPlus1.pulse(11)
    return
def other1():
    IOPiPlus1.pulse(13)
    return
def other2():
    IOPiPlus1.pulse(15)
    return

allHeaters = [bathroom, lounge, bedroom1, bedroom2, kitchen, hall, other1, other2]



### ----- HEATER STATUS FUNCTIONS -----

def setHeatersStatus(x):
    global heatersStatus
    heatersStatus = x
    return

def getHeaterStatus(x):
    status = heatersStatus[x-1]
    if status == 0:
        return 'on'
    else:
        return 'off'

def status(x):
    if x == 'bathroom':
        return getHeaterStatus(1)
    elif x == 'lounge':
        return getHeaterStatus(2)
    elif x == 'bedroom1':
        return getHeaterStatus(3)
    elif x == 'bedroom2':
        return getHeaterStatus(4)
    elif x == 'kitchen':
        return getHeaterStatus(5)
    elif x == 'hall':
        return getHeaterStatus(6)
    elif x == 'other1':
        return getHeaterStatus(7)
    elif x == 'other2':
        return getHeaterStatus(8)
    else:
        return None
    
    
    
### ----- LIGHT SWITCHING FUNCTIONS -----

def switch(x):
    if x == 'allSwitch':
        heaterSwitch(allHeaters)
    elif x == 'allOn':
        allSame('on')
    elif x == 'allOff':
        allSame('off')
    else:
        heaterSwitch(x)
    return

def heaterSwitch(heaters):
    global heaterUsage
    if heaterUsage == False:
        heaterUsage = True
        try:
            if isinstance(heaters, str) == False:
                for heater in heaters:
                    heater()
                    time.sleep(relayTimeDelay)
            else:
                for heater in allHeaters:
                    if heaters == heater.__name__:
                        heater()
        except:
            pass
        heaterUsage = False
    else:
        pass
    return

def allSame(desired):
    now = 'off'
    if desired == 'off':
        now = 'on'
    heaters = []
    for heater in allHeaters:
        if status(heater.__name__) == now:
            heaters.append(heater)
    heaterSwitch(heaters)
    return

def scheduleRun(heatingDevices):
    storageList = []
    for key in heatingDevices:
        if heatingDevices[key] != status(key):
            for heater in allHeaters:
                if key == heater.__name__:
                    storageList.append(heater)
    heaterSwitch(storageList)
    return

#
#
#
#
#
#
#from datetime import datetime, timedelta
#from threading import Thread
#import time
#
#import IOPiPlus1
#import threads
#
#heaterStatus = [1]*8
#
#def setHeaterStatus(x):
#    global heaterStatus
#    heaterStatus = x
#    return
#
#def getHeaterStatus(x):
#    status = heaterStatus[x-1]
#    if status == 0:
#        return 'on'
#    else:
#        return 'off'
#
#def scheduleRun(heatingDevices):
#    return

## ----- HEATER START/END TIME -----

heaterNow = status('other2')
heaterStartTime = 0
heaterEndTime = datetime.now()

def getHeaterTime(time):
    if time == 'start':
        return heaterStartTime
    else:
        return heaterEndTime

def heatingDetectLoop():
    global heaterNow, heaterStartTime, heaterEndTime
    while True:
        if status('other2') == heaterNow:
            pass
        else:
            if status('other2') == 'on':
                heaterNow = 'on'
                heaterStartTime = datetime.now()
            else:
                heaterNow = 'off'
                heaterEndTime = datetime.now()
        time.sleep(30)
    


