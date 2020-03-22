# Problem Description and Discussion

> This document is very much writing in progress...

The goal of Vyardage is to basically reverse engineer the ball flight dynamics of World Golf Tour (WGT). The game is quite realistic in simulating how different parameters of a shot affect the resulting ball flight. The obvious difference is that in real life we are never able to isolate and control individual parameters and even the most skilled player has to resort to what we call the feel or touch. This vague "human factor" is not present in WGT and the shots played are almost always technique-wise perfect, the game offers an interesting chance of playing better by keeping records of one's shot history and leveraging that data when planning the next shot.

It is important to note that Vyardage does not attempt to gather every possible shot parameter nor predict all of the resulting conditions for those parameters. Rather it tries to strike a balance between simplicity and meaningful accuracy to keep playing the actual game at least somewhat enjoyable.

## Domain Introduction

The flight of a golf ball in the game is mainly governed by the speed, vertical angle and spin imparted on the ball by the clubface at impact. After impact, wind becomes an important factor shaping the ball flight to right or left, and slowing down or speeding up the ball. This also changes the landing angle of the ball, which is futher affected by the elevation difference between starting and landing points.

Once the ball hits the ground, it will bounce a few times and then roll. Both of these results are governed by a multitude of factors that are beyond the scope of Vyardage - things such as green speed and shape would be extremely hard to record with any accuracy. The results of the landing conditions are some of the hardest things to predict in golf, whether real or virtual, and they are left for the player to judge. However, the *length of the shot* can be identified as the most important result of all, and it is indeed the only metric Vyardage attempts to predict.

## Shot Parameters in Game

### Power

The power parameter indicates a percentage out of 100 % at which the player decides to strike the ball. For any given club, it is the main factor determining how fast the ball departs from the club face therefore affecting especially the distance, height and spin of the shot.
