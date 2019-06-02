
## ----- IMPORTS -----

from IOPiPlus2 import IoPi
import smbus
import time
import re
import datetime
import threading

import lighting
import heating



## ----- SETUP I2C INTERACTION -----

def get_smbus():
    i2c_bus = 0
    for line in open('/proc/cpuinfo').readlines():
        m = re.match('(.*?)\s*:\s*(.*)', line)
        if m:
            (name, value) = (m.group(1), m.group(2))
            if name == "Revision":
                if value[-4:] in ('0002', '0003'):
                    i2c_bus = 0
                else:
                    i2c_bus = 1
                break
    try:        
        return smbus.SMBus(i2c_bus)
    except IOError:
            return False

bus = get_smbus()



## ----- FUNCTIONS -----

"""
set_pin_direction(pin, direction)     pins 1-16 | 0-out, 1-in.
set_port_direction(port, direction)   ports 0-1 | 0-out, 1-in.
write_pin(pin, value)                 pins 1-16 | 0-low, 1-high.
write_port(port, value)               ports 0-1 | 0-low, 1-high.
read_pin(pin)                         pins 1-16 | returns 0: low, returns 1: high.
read_port(port)                       ports 0-1 | returns 0-255 or 0x00-0xFF.
"""



## ----- SET (ALL 2x BUS) ADDRESS -----

"""
Bus is variable defined above.
Bus number defined here.
I2C address is defined here.
"""

bus1 = IoPi(bus, 0x20) # Layer1, Bus1, 0x20
bus2 = IoPi(bus, 0x21) # Layer1, Bus1, 0x21



## ----- SET (ALL 4x PORTS) DIRECTION -----

"""
Bus number is variable found above.
Pins 1-8 = Port 0, Pins 9-16 = Port 1.
Out = 0, In = 1.
"""

bus1.set_port_direction(0, 1) # Bus1, pins 1-8,  in
bus1.set_port_direction(1, 1) # Bus1, pins 9-16, in
bus2.set_port_direction(0, 0) # Bus2, pins 1-8,  out
bus2.set_port_direction(1, 0) # Bus2, pins 9-16, out

bus1.set_pin_direction(1, 1)
bus1.set_pin_direction(3, 1)
bus1.set_pin_direction(5, 1)
bus1.set_pin_direction(7, 1)
bus1.set_pin_direction(9, 1)
bus1.set_pin_direction(11, 1)
bus1.set_pin_direction(13, 1)
bus1.set_pin_direction(15, 1)
bus1.set_pin_direction(2, 1)
bus1.set_pin_direction(4, 1)
bus1.set_pin_direction(6, 1)
bus1.set_pin_direction(8, 1)
bus1.set_pin_direction(10, 1)
bus1.set_pin_direction(12, 1)
bus1.set_pin_direction(14, 1)
bus1.set_pin_direction(16, 1)



## ----- PULL (ALL 32x PINS) LOW -----

"""
Bus number is variable found above.
Pins 1-8 = Port 0, Pins 9-16 = Port 1.
Low = 0, High = 1.
"""

def allLow():
    bus2.write_port(0, 0) # Bus2, pins 1-8,  low
    bus2.write_port(1, 0) # Bus2, pins 9-16, low
    
allLow()



## ----- PINS FUNCTIONS -----

def pulse(x):
    bus2.write_pin(x, 1)
    time.sleep(0.1)
    bus2.write_pin(x, 0)
    return

def readLoop():
    while True:
        l1 = bus1.read_pin(2)
        l2 = bus1.read_pin(4)
        l3 = bus1.read_pin(6)
        l4 = bus1.read_pin(8)
        l5 = bus1.read_pin(10)
        l6 = bus1.read_pin(12)
        l7 = bus1.read_pin(14)
        l8 = bus1.read_pin(16)
        h1 = bus1.read_pin(1)
        h2 = bus1.read_pin(3)
        h3 = bus1.read_pin(5)
        h4 = bus1.read_pin(7)
        h5 = bus1.read_pin(9)
        h6 = bus1.read_pin(11)
        h7 = bus1.read_pin(13)
        h8 = bus1.read_pin(15)
        lights = [l1, l2, l3, l4, l5, l6, l7, l8]
        heaters = [h1, h2, h3, h4, h5, h6, h7, h8]
        lighting.setLightsStatus(lights)
        heating.setHeatersStatus(heaters)
        time.sleep(0.5)
        