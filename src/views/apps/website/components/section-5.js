import React from 'react'

export default () => (
  <section className="s5">
    <div className="overlay" />
    <div className="outter-circle" />
    <div className="inner-circle">
      <i class="fas fa-play" />
      <i class="fas fa-play hide-play" />
    </div>
    <style>
      {`
        .s5 {
            font-size: 16px;
            margin-top: 10em;
            height: 55vh;
            background-image: url(https://bootstrapmade.com/demo/themes/eStartup/img/video-bg.jpg);
            background-position: center;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: black;
            opacity: .8;
        }
        .outter-circle {
            position: absolute;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            border: 1px solid hsl(120, 6%, 65%);
            
            animation: alert 2s infinite;
        }
        .inner-circle {
            position: relative;
            transition: all .6s;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
            width: 100px;
            line-height: 100px;
            border-radius: 50%;
            background: hsl(120, 46%, 54%);
            text-align: center;
            cursor: pointer;
            overflow: hidden;
            z-index: 3;
        }
        
        .inner-circle i {
            color: white;
            transition: all .3s;
        }
        .hide-play {
            position: absolute;
        }
        .inner-circle:hover {
            transform: scale(1.5);
        }
        .inner-circle:hover i:not(.hide-play) {
            transform: scale(10);
            opacity: 0;
        }
        

        @keyframes alert {
            from {
                transform: scale(1);
            }
            to {
                border: none;
                transform: scale(1.5);
            }
            
        }
        
        
        `}
    </style>
  </section>
)
