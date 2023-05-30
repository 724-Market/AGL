<template>
  <div class="squares-animate-bg">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style>
.squares-animate-bg {
  height: 100%;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1
}

.squares-animate-bg div {
  animation: floatingSquares 25s linear infinite;
  background: hsla(0, 0%, 100%, .5);
  border-radius: 15px;
  bottom: -150px;
  display: block;
  height: 20px;
  position: absolute;
  width: 20px
}

@-webkit-keyframes floatingSquares {
  0% {
    border-radius: 10px;
    opacity: 1;
    transform: translateY(0) rotate(0deg)
  }

  to {
    border-radius: 50%;
    opacity: 0;
    transform: translateY(-1000px) rotate(2turn)
  }
}

@keyframes floatingSquares {
  0% {
    border-radius: 10px;
    opacity: 1;
    transform: translateY(0) rotate(0deg)
  }

  to {
    border-radius: 50%;
    opacity: 0;
    transform: translateY(-1000px) rotate(2turn)
  }
}

@media only screen and (min-width: 45rem) {
  .squares-animate-bg div {
    border-radius: 20px
  }
}

.squares-animate-bg div:first-child {
  animation-delay: 0s;
  height: 50px;
  left: 25%;
  width: 50px
}

@media only screen and (min-width: 45rem) {
  .squares-animate-bg div:first-child {
    height: 80px;
    width: 80px
  }
}

.squares-animate-bg div:nth-child(2) {
  animation-delay: 2s;
  animation-duration: 12s;
  height: 20px;
  left: 10%;
  width: 20px
}

.squares-animate-bg div:nth-child(3) {
  animation-delay: 4s;
  height: 20px;
  left: 70%;
  width: 20px
}

.squares-animate-bg div:nth-child(4) {
  animation-delay: 0s;
  animation-duration: 18s;
  height: 40px;
  left: 40%;
  width: 40px
}

@media only screen and (min-width: 45rem) {
  .squares-animate-bg div:nth-child(4) {
    height: 60px;
    width: 60px
  }
}

.squares-animate-bg div:nth-child(5) {
  animation-delay: 0s;
  height: 20px;
  left: 65%;
  width: 20px
}

.squares-animate-bg div:nth-child(6) {
  animation-delay: 3s;
  height: 70px;
  left: 75%;
  width: 70px
}

@media only screen and (min-width: 45rem) {
  .squares-animate-bg div:nth-child(6) {
    height: 110px;
    width: 110px
  }
}

.squares-animate-bg div:nth-child(7) {
  animation-delay: 7s;
  height: 80px;
  left: 35%;
  width: 80px
}

@media only screen and (min-width: 45rem) {
  .squares-animate-bg div:nth-child(7) {
    height: 120px;
    width: 120px
  }
}

.squares-animate-bg div:nth-child(8) {
  animation-delay: 15s;
  animation-duration: 45s;
  height: 25px;
  left: 50%;
  width: 25px
}

.squares-animate-bg div:nth-child(9) {
  animation-delay: 2s;
  animation-duration: 35s;
  height: 15px;
  left: 20%;
  width: 15px
}

.squares-animate-bg div:nth-child(10) {
  animation-delay: 0s;
  animation-duration: 11s;
  height: 80px;
  left: 85%;
  width: 80px
}

@media only screen and (min-width: 45rem) {
  .squares-animate-bg div:nth-child(10) {
    height: 120px;
    width: 120px
  }
}
</style>
