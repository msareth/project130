song1status = ''
song2status = ''

leftWristX = 0
leftWristY = 0

rightWristX = 0
rightWristY = 0

scoreLeftWrist = 0
scoreRightWrist = 0

song1 = ''
song2 = ''

function preload() {
  song1 = loadSound('Bon_Bon_Chocolat_EVERGLOW.mp3')
  song2 = loadSound('Mixed_Up_ENHYPEN.mp3')
}

function setup() {
  canvas = createCanvas(500, 500)
  canvas.center()

  video = createCapture(VIDEO)
  video.hide()

  poseNet = ml5.poseNet(video, modelLoaded)
  poseNet.on('pose', gotPoses)
}

function modelLoaded() {
  console.log('Model has loaded')
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results)

    scoreLeftWrist = results[0].pose.keypoints[9].score
    scoreRightWrist = results[0].pose.keypoints[10].score

    console.log("Right wrist score = " + scoreRightWrist)
    console.log("Left wrist score = " + scoreLeftWrist)

    leftWristX = results[0].pose.leftWrist.x
    leftWristY = results[0].pose.leftWrist.y
    console.log('Left wrist x = ' + leftWristX + 'Left wrist y = ' + leftWristY)

    rightWristX = results[0].pose.rightWrist.x
    rightWristY = results[0].pose.rightWrist.y
    console.log(
      'Right wrist x = ' + rightWristX + 'Right wrist y = ' + rightWristY,
    )
  }
}

function draw() {
  image(video, 0, 0, 500, 500)
  song1status = song1.isPlaying()

  fill('#ff0000')
  stroke('#9c0000')

  if (scoreLeftWrist > 0.01) {
    circle(leftWristX, leftWristY, 30)
    song2.stop()
    if (song1status == false) {
      song1.play()
      document.getElementById('songname').innerHTML = 'Playing Bon Bon Chocolat'
    }
  }
  if(scoreRightWrist > 0.01) {
circle(rightWristX, rightWristY, 30)
song1.stop()
if(song2status == false) {
song2.play()
document.getElementById("songname").innerHTML = "Playing Mixed Up"
}
  }
}
