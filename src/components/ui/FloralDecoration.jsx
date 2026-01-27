import React from 'react';

// Maximalist forest garden decorations - lush, dense botanical elements
const FloralDecoration = ({ variant = 'corner-left', className = '' }) => {
  const decorations = {
    'corner-left': (
      <svg viewBox="0 0 300 400" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dense vine structure */}
        <path d="M20 400 C20 350 30 300 50 250 C70 200 60 150 40 100 C20 50 30 0 50 -20"
              stroke="#6b7c5e" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
        <path d="M40 400 C50 330 70 280 90 230 C110 180 100 130 80 80 C60 30 70 0 80 -10"
              stroke="#556649" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M10 380 C30 320 50 270 70 220 C90 170 80 120 60 70"
              stroke="#8a9a7b" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>

        {/* Cascading leaves - multiple layers */}
        <ellipse cx="35" cy="350" rx="35" ry="15" fill="#6b7c5e" opacity="0.7" transform="rotate(-25 35 350)"/>
        <ellipse cx="55" cy="310" rx="32" ry="14" fill="#556649" opacity="0.6" transform="rotate(20 55 310)"/>
        <ellipse cx="40" cy="270" rx="30" ry="13" fill="#8a9a7b" opacity="0.7" transform="rotate(-30 40 270)"/>
        <ellipse cx="65" cy="230" rx="28" ry="12" fill="#6b7c5e" opacity="0.6" transform="rotate(25 65 230)"/>
        <ellipse cx="50" cy="190" rx="26" ry="11" fill="#44513b" opacity="0.7" transform="rotate(-20 50 190)"/>
        <ellipse cx="70" cy="150" rx="24" ry="10" fill="#6b7c5e" opacity="0.6" transform="rotate(15 70 150)"/>
        <ellipse cx="55" cy="110" rx="22" ry="9" fill="#8a9a7b" opacity="0.5" transform="rotate(-25 55 110)"/>
        <ellipse cx="65" cy="70" rx="20" ry="8" fill="#556649" opacity="0.6" transform="rotate(20 65 70)"/>
        <ellipse cx="50" cy="40" rx="18" ry="7" fill="#6b7c5e" opacity="0.5" transform="rotate(-15 50 40)"/>

        {/* Additional small leaves */}
        <ellipse cx="20" cy="330" rx="15" ry="6" fill="#8a9a7b" opacity="0.5" transform="rotate(-40 20 330)"/>
        <ellipse cx="80" cy="280" rx="14" ry="5" fill="#556649" opacity="0.4" transform="rotate(35 80 280)"/>
        <ellipse cx="25" cy="240" rx="13" ry="5" fill="#6b7c5e" opacity="0.5" transform="rotate(-35 25 240)"/>
        <ellipse cx="85" cy="200" rx="12" ry="5" fill="#8a9a7b" opacity="0.4" transform="rotate(30 85 200)"/>

        {/* Hydrangea clusters */}
        <g opacity="0.8">
          <circle cx="90" cy="320" r="20" fill="#572932"/>
          <circle cx="85" cy="310" r="8" fill="#6b2d38"/>
          <circle cx="95" cy="315" r="7" fill="#8b243d"/>
          <circle cx="88" cy="325" r="9" fill="#a72845"/>
          <circle cx="98" cy="328" r="6" fill="#572932"/>
          <circle cx="82" cy="318" r="5" fill="#c73656"/>
        </g>

        <g opacity="0.7">
          <circle cx="100" cy="240" r="18" fill="#572932"/>
          <circle cx="95" cy="232" r="7" fill="#6b2d38"/>
          <circle cx="105" cy="238" r="6" fill="#8b243d"/>
          <circle cx="98" cy="248" r="8" fill="#a72845"/>
          <circle cx="108" cy="245" r="5" fill="#572932"/>
        </g>

        <g opacity="0.6">
          <circle cx="85" cy="160" r="15" fill="#572932"/>
          <circle cx="80" cy="155" r="6" fill="#6b2d38"/>
          <circle cx="90" cy="158" r="5" fill="#8b243d"/>
          <circle cx="83" cy="165" r="7" fill="#a72845"/>
        </g>

        {/* Rose blooms */}
        <g opacity="0.9">
          <circle cx="70" cy="360" r="16" fill="#572932"/>
          <circle cx="70" cy="360" r="12" fill="#6b2d38"/>
          <circle cx="70" cy="360" r="8" fill="#8b243d"/>
          <circle cx="70" cy="360" r="4" fill="#C9A227"/>
        </g>

        <g opacity="0.8">
          <circle cx="110" cy="280" r="14" fill="#572932"/>
          <circle cx="110" cy="280" r="10" fill="#6b2d38"/>
          <circle cx="110" cy="280" r="6" fill="#8b243d"/>
          <circle cx="110" cy="280" r="3" fill="#C9A227"/>
        </g>

        <g opacity="0.7">
          <circle cx="95" cy="180" r="12" fill="#572932"/>
          <circle cx="95" cy="180" r="8" fill="#6b2d38"/>
          <circle cx="95" cy="180" r="5" fill="#8b243d"/>
          <circle cx="95" cy="180" r="2" fill="#C9A227"/>
        </g>

        {/* Small buds and berries */}
        <circle cx="30" cy="380" r="6" fill="#572932" opacity="0.7"/>
        <circle cx="45" cy="290" r="5" fill="#6b2d38" opacity="0.6"/>
        <circle cx="75" cy="200" r="4" fill="#8b243d" opacity="0.6"/>
        <circle cx="60" cy="130" r="4" fill="#572932" opacity="0.5"/>
        <circle cx="80" cy="90" r="3" fill="#6b2d38" opacity="0.5"/>
        <circle cx="55" cy="60" r="3" fill="#a72845" opacity="0.4"/>

        {/* Trailing vines */}
        <path d="M100 350 Q120 340 115 320 Q110 300 130 290" stroke="#6b7c5e" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M105 260 Q125 250 120 230 Q115 210 135 200" stroke="#8a9a7b" strokeWidth="1" fill="none" opacity="0.4"/>
      </svg>
    ),

    'corner-right': (
      <svg viewBox="0 0 300 400" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dense vine structure */}
        <path d="M280 400 C280 350 270 300 250 250 C230 200 240 150 260 100 C280 50 270 0 250 -20"
              stroke="#6b7c5e" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
        <path d="M260 400 C250 330 230 280 210 230 C190 180 200 130 220 80 C240 30 230 0 220 -10"
              stroke="#556649" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        <path d="M290 380 C270 320 250 270 230 220 C210 170 220 120 240 70"
              stroke="#8a9a7b" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>

        {/* Cascading leaves - multiple layers */}
        <ellipse cx="265" cy="350" rx="35" ry="15" fill="#6b7c5e" opacity="0.7" transform="rotate(25 265 350)"/>
        <ellipse cx="245" cy="310" rx="32" ry="14" fill="#556649" opacity="0.6" transform="rotate(-20 245 310)"/>
        <ellipse cx="260" cy="270" rx="30" ry="13" fill="#8a9a7b" opacity="0.7" transform="rotate(30 260 270)"/>
        <ellipse cx="235" cy="230" rx="28" ry="12" fill="#6b7c5e" opacity="0.6" transform="rotate(-25 235 230)"/>
        <ellipse cx="250" cy="190" rx="26" ry="11" fill="#44513b" opacity="0.7" transform="rotate(20 250 190)"/>
        <ellipse cx="230" cy="150" rx="24" ry="10" fill="#6b7c5e" opacity="0.6" transform="rotate(-15 230 150)"/>
        <ellipse cx="245" cy="110" rx="22" ry="9" fill="#8a9a7b" opacity="0.5" transform="rotate(25 245 110)"/>
        <ellipse cx="235" cy="70" rx="20" ry="8" fill="#556649" opacity="0.6" transform="rotate(-20 235 70)"/>
        <ellipse cx="250" cy="40" rx="18" ry="7" fill="#6b7c5e" opacity="0.5" transform="rotate(15 250 40)"/>

        {/* Additional small leaves */}
        <ellipse cx="280" cy="330" rx="15" ry="6" fill="#8a9a7b" opacity="0.5" transform="rotate(40 280 330)"/>
        <ellipse cx="220" cy="280" rx="14" ry="5" fill="#556649" opacity="0.4" transform="rotate(-35 220 280)"/>
        <ellipse cx="275" cy="240" rx="13" ry="5" fill="#6b7c5e" opacity="0.5" transform="rotate(35 275 240)"/>
        <ellipse cx="215" cy="200" rx="12" ry="5" fill="#8a9a7b" opacity="0.4" transform="rotate(-30 215 200)"/>

        {/* Hydrangea clusters */}
        <g opacity="0.8">
          <circle cx="210" cy="320" r="20" fill="#572932"/>
          <circle cx="215" cy="310" r="8" fill="#6b2d38"/>
          <circle cx="205" cy="315" r="7" fill="#8b243d"/>
          <circle cx="212" cy="325" r="9" fill="#a72845"/>
          <circle cx="202" cy="328" r="6" fill="#572932"/>
          <circle cx="218" cy="318" r="5" fill="#c73656"/>
        </g>

        <g opacity="0.7">
          <circle cx="200" cy="240" r="18" fill="#572932"/>
          <circle cx="205" cy="232" r="7" fill="#6b2d38"/>
          <circle cx="195" cy="238" r="6" fill="#8b243d"/>
          <circle cx="202" cy="248" r="8" fill="#a72845"/>
          <circle cx="192" cy="245" r="5" fill="#572932"/>
        </g>

        <g opacity="0.6">
          <circle cx="215" cy="160" r="15" fill="#572932"/>
          <circle cx="220" cy="155" r="6" fill="#6b2d38"/>
          <circle cx="210" cy="158" r="5" fill="#8b243d"/>
          <circle cx="217" cy="165" r="7" fill="#a72845"/>
        </g>

        {/* Rose blooms */}
        <g opacity="0.9">
          <circle cx="230" cy="360" r="16" fill="#572932"/>
          <circle cx="230" cy="360" r="12" fill="#6b2d38"/>
          <circle cx="230" cy="360" r="8" fill="#8b243d"/>
          <circle cx="230" cy="360" r="4" fill="#C9A227"/>
        </g>

        <g opacity="0.8">
          <circle cx="190" cy="280" r="14" fill="#572932"/>
          <circle cx="190" cy="280" r="10" fill="#6b2d38"/>
          <circle cx="190" cy="280" r="6" fill="#8b243d"/>
          <circle cx="190" cy="280" r="3" fill="#C9A227"/>
        </g>

        <g opacity="0.7">
          <circle cx="205" cy="180" r="12" fill="#572932"/>
          <circle cx="205" cy="180" r="8" fill="#6b2d38"/>
          <circle cx="205" cy="180" r="5" fill="#8b243d"/>
          <circle cx="205" cy="180" r="2" fill="#C9A227"/>
        </g>

        {/* Small buds and berries */}
        <circle cx="270" cy="380" r="6" fill="#572932" opacity="0.7"/>
        <circle cx="255" cy="290" r="5" fill="#6b2d38" opacity="0.6"/>
        <circle cx="225" cy="200" r="4" fill="#8b243d" opacity="0.6"/>
        <circle cx="240" cy="130" r="4" fill="#572932" opacity="0.5"/>
        <circle cx="220" cy="90" r="3" fill="#6b2d38" opacity="0.5"/>
        <circle cx="245" cy="60" r="3" fill="#a72845" opacity="0.4"/>

        {/* Trailing vines */}
        <path d="M200 350 Q180 340 185 320 Q190 300 170 290" stroke="#6b7c5e" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M195 260 Q175 250 180 230 Q185 210 165 200" stroke="#8a9a7b" strokeWidth="1" fill="none" opacity="0.4"/>
      </svg>
    ),

    'divider': (
      <svg viewBox="0 0 600 100" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Center rose */}
        <g>
          <circle cx="300" cy="50" r="22" fill="#572932"/>
          <circle cx="300" cy="50" r="16" fill="#6b2d38"/>
          <circle cx="300" cy="50" r="10" fill="#8b243d"/>
          <circle cx="300" cy="50" r="5" fill="#C9A227"/>
        </g>

        {/* Left branch with leaves and flowers */}
        <path d="M278 50 C240 50 200 40 150 50 C100 60 50 45 0 50" stroke="#6b7c5e" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>

        {/* Left leaves */}
        <ellipse cx="240" cy="45" rx="22" ry="9" fill="#6b7c5e" opacity="0.6" transform="rotate(-15 240 45)"/>
        <ellipse cx="190" cy="52" rx="20" ry="8" fill="#8a9a7b" opacity="0.5" transform="rotate(10 190 52)"/>
        <ellipse cx="140" cy="48" rx="18" ry="7" fill="#556649" opacity="0.6" transform="rotate(-12 140 48)"/>
        <ellipse cx="90" cy="55" rx="16" ry="6" fill="#6b7c5e" opacity="0.5" transform="rotate(8 90 55)"/>
        <ellipse cx="40" cy="50" rx="14" ry="5" fill="#8a9a7b" opacity="0.4" transform="rotate(-10 40 50)"/>

        {/* Left flowers */}
        <circle cx="260" cy="42" r="10" fill="#572932" opacity="0.8"/>
        <circle cx="260" cy="42" r="6" fill="#6b2d38" opacity="0.7"/>
        <circle cx="260" cy="42" r="3" fill="#C9A227" opacity="0.8"/>

        <circle cx="170" cy="55" r="8" fill="#572932" opacity="0.7"/>
        <circle cx="170" cy="55" r="5" fill="#6b2d38" opacity="0.6"/>

        <circle cx="110" cy="48" r="6" fill="#a72845" opacity="0.6"/>
        <circle cx="60" cy="52" r="5" fill="#572932" opacity="0.5"/>

        {/* Right branch with leaves and flowers */}
        <path d="M322 50 C360 50 400 40 450 50 C500 60 550 45 600 50" stroke="#6b7c5e" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>

        {/* Right leaves */}
        <ellipse cx="360" cy="45" rx="22" ry="9" fill="#6b7c5e" opacity="0.6" transform="rotate(15 360 45)"/>
        <ellipse cx="410" cy="52" rx="20" ry="8" fill="#8a9a7b" opacity="0.5" transform="rotate(-10 410 52)"/>
        <ellipse cx="460" cy="48" rx="18" ry="7" fill="#556649" opacity="0.6" transform="rotate(12 460 48)"/>
        <ellipse cx="510" cy="55" rx="16" ry="6" fill="#6b7c5e" opacity="0.5" transform="rotate(-8 510 55)"/>
        <ellipse cx="560" cy="50" rx="14" ry="5" fill="#8a9a7b" opacity="0.4" transform="rotate(10 560 50)"/>

        {/* Right flowers */}
        <circle cx="340" cy="42" r="10" fill="#572932" opacity="0.8"/>
        <circle cx="340" cy="42" r="6" fill="#6b2d38" opacity="0.7"/>
        <circle cx="340" cy="42" r="3" fill="#C9A227" opacity="0.8"/>

        <circle cx="430" cy="55" r="8" fill="#572932" opacity="0.7"/>
        <circle cx="430" cy="55" r="5" fill="#6b2d38" opacity="0.6"/>

        <circle cx="490" cy="48" r="6" fill="#a72845" opacity="0.6"/>
        <circle cx="540" cy="52" r="5" fill="#572932" opacity="0.5"/>

        {/* Small berries */}
        <circle cx="220" cy="58" r="3" fill="#6b2d38" opacity="0.5"/>
        <circle cx="380" cy="58" r="3" fill="#6b2d38" opacity="0.5"/>
        <circle cx="130" cy="42" r="2" fill="#a72845" opacity="0.4"/>
        <circle cx="470" cy="42" r="2" fill="#a72845" opacity="0.4"/>
      </svg>
    ),

    'top-border': (
      <svg viewBox="0 0 1400 150" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {/* Multiple flowing vines */}
        <path d="M0 100 C150 80 300 120 450 90 C600 60 750 110 900 80 C1050 50 1200 100 1400 70"
              stroke="#6b7c5e" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <path d="M0 120 C200 90 400 130 600 100 C800 70 1000 120 1200 90 C1300 75 1350 85 1400 80"
              stroke="#556649" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <path d="M0 80 C100 100 250 70 400 95 C550 120 700 75 850 100 C1000 125 1150 80 1400 95"
              stroke="#8a9a7b" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>

        {/* Dense scattered leaves */}
        <ellipse cx="80" cy="95" rx="28" ry="11" fill="#6b7c5e" opacity="0.6" transform="rotate(-20 80 95)"/>
        <ellipse cx="180" cy="105" rx="24" ry="10" fill="#8a9a7b" opacity="0.5" transform="rotate(15 180 105)"/>
        <ellipse cx="280" cy="85" rx="26" ry="10" fill="#556649" opacity="0.6" transform="rotate(-12 280 85)"/>
        <ellipse cx="380" cy="110" rx="22" ry="9" fill="#6b7c5e" opacity="0.5" transform="rotate(18 380 110)"/>
        <ellipse cx="480" cy="78" rx="25" ry="10" fill="#8a9a7b" opacity="0.6" transform="rotate(-15 480 78)"/>
        <ellipse cx="580" cy="95" rx="23" ry="9" fill="#44513b" opacity="0.5" transform="rotate(10 580 95)"/>
        <ellipse cx="680" cy="88" rx="26" ry="10" fill="#6b7c5e" opacity="0.6" transform="rotate(-18 680 88)"/>
        <ellipse cx="780" cy="105" rx="24" ry="9" fill="#8a9a7b" opacity="0.5" transform="rotate(12 780 105)"/>
        <ellipse cx="880" cy="75" rx="25" ry="10" fill="#556649" opacity="0.6" transform="rotate(-10 880 75)"/>
        <ellipse cx="980" cy="100" rx="22" ry="9" fill="#6b7c5e" opacity="0.5" transform="rotate(15 980 100)"/>
        <ellipse cx="1080" cy="85" rx="26" ry="10" fill="#8a9a7b" opacity="0.6" transform="rotate(-14 1080 85)"/>
        <ellipse cx="1180" cy="95" rx="24" ry="9" fill="#44513b" opacity="0.5" transform="rotate(8 1180 95)"/>
        <ellipse cx="1300" cy="80" rx="22" ry="8" fill="#6b7c5e" opacity="0.5" transform="rotate(-12 1300 80)"/>

        {/* Scattered flowers and hydrangeas */}
        <g opacity="0.8">
          <circle cx="130" cy="90" r="12" fill="#572932"/>
          <circle cx="130" cy="90" r="8" fill="#6b2d38"/>
          <circle cx="130" cy="90" r="4" fill="#C9A227"/>
        </g>

        <g opacity="0.7">
          <circle cx="330" cy="100" r="14" fill="#572932"/>
          <circle cx="325" cy="95" r="5" fill="#6b2d38"/>
          <circle cx="335" cy="98" r="4" fill="#8b243d"/>
          <circle cx="328" cy="105" r="6" fill="#a72845"/>
        </g>

        <g opacity="0.8">
          <circle cx="530" cy="85" r="11" fill="#572932"/>
          <circle cx="530" cy="85" r="7" fill="#6b2d38"/>
          <circle cx="530" cy="85" r="3" fill="#C9A227"/>
        </g>

        <g opacity="0.7">
          <circle cx="730" cy="95" r="13" fill="#572932"/>
          <circle cx="726" cy="90" r="5" fill="#6b2d38"/>
          <circle cx="734" cy="93" r="4" fill="#8b243d"/>
          <circle cx="728" cy="100" r="5" fill="#a72845"/>
        </g>

        <g opacity="0.8">
          <circle cx="930" cy="80" r="10" fill="#572932"/>
          <circle cx="930" cy="80" r="6" fill="#6b2d38"/>
          <circle cx="930" cy="80" r="3" fill="#C9A227"/>
        </g>

        <g opacity="0.7">
          <circle cx="1130" cy="90" r="12" fill="#572932"/>
          <circle cx="1130" cy="90" r="8" fill="#6b2d38"/>
          <circle cx="1130" cy="90" r="4" fill="#C9A227"/>
        </g>

        {/* Small buds */}
        <circle cx="230" cy="95" r="5" fill="#572932" opacity="0.6"/>
        <circle cx="430" cy="105" r="4" fill="#6b2d38" opacity="0.5"/>
        <circle cx="630" cy="90" r="5" fill="#a72845" opacity="0.5"/>
        <circle cx="830" cy="100" r="4" fill="#572932" opacity="0.6"/>
        <circle cx="1030" cy="85" r="5" fill="#6b2d38" opacity="0.5"/>
        <circle cx="1230" cy="95" r="4" fill="#a72845" opacity="0.5"/>
        <circle cx="1350" cy="75" r="4" fill="#572932" opacity="0.5"/>
      </svg>
    ),

    'side-border': (
      <svg viewBox="0 0 100 600" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {/* Vertical vine */}
        <path d="M50 0 C60 100 40 200 55 300 C70 400 45 500 50 600"
              stroke="#6b7c5e" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <path d="M45 0 C35 80 55 160 40 240 C25 320 50 400 35 480 C20 560 40 580 45 600"
              stroke="#8a9a7b" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>

        {/* Leaves along the vine */}
        <ellipse cx="55" cy="50" rx="25" ry="10" fill="#6b7c5e" opacity="0.6" transform="rotate(30 55 50)"/>
        <ellipse cx="45" cy="120" rx="22" ry="9" fill="#8a9a7b" opacity="0.5" transform="rotate(-25 45 120)"/>
        <ellipse cx="60" cy="190" rx="24" ry="10" fill="#556649" opacity="0.6" transform="rotate(35 60 190)"/>
        <ellipse cx="40" cy="260" rx="22" ry="9" fill="#6b7c5e" opacity="0.5" transform="rotate(-30 40 260)"/>
        <ellipse cx="55" cy="330" rx="25" ry="10" fill="#8a9a7b" opacity="0.6" transform="rotate(28 55 330)"/>
        <ellipse cx="45" cy="400" rx="23" ry="9" fill="#44513b" opacity="0.5" transform="rotate(-32 45 400)"/>
        <ellipse cx="60" cy="470" rx="24" ry="10" fill="#6b7c5e" opacity="0.6" transform="rotate(25 60 470)"/>
        <ellipse cx="50" cy="540" rx="22" ry="9" fill="#8a9a7b" opacity="0.5" transform="rotate(-28 50 540)"/>

        {/* Flowers */}
        <circle cx="70" cy="80" r="12" fill="#572932" opacity="0.8"/>
        <circle cx="70" cy="80" r="8" fill="#6b2d38" opacity="0.7"/>
        <circle cx="70" cy="80" r="4" fill="#C9A227" opacity="0.8"/>

        <circle cx="30" cy="220" r="10" fill="#572932" opacity="0.7"/>
        <circle cx="30" cy="220" r="6" fill="#6b2d38" opacity="0.6"/>

        <circle cx="75" cy="360" r="11" fill="#572932" opacity="0.8"/>
        <circle cx="75" cy="360" r="7" fill="#6b2d38" opacity="0.7"/>
        <circle cx="75" cy="360" r="3" fill="#C9A227" opacity="0.8"/>

        <circle cx="25" cy="500" r="9" fill="#572932" opacity="0.7"/>
        <circle cx="25" cy="500" r="5" fill="#6b2d38" opacity="0.6"/>

        {/* Small buds */}
        <circle cx="35" cy="150" r="4" fill="#a72845" opacity="0.5"/>
        <circle cx="65" cy="290" r="4" fill="#572932" opacity="0.5"/>
        <circle cx="40" cy="430" r="4" fill="#6b2d38" opacity="0.5"/>
        <circle cx="60" cy="570" r="3" fill="#a72845" opacity="0.4"/>
      </svg>
    ),

    'small-flower': (
      <svg viewBox="0 0 60 60" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Petals */}
        <circle cx="30" cy="18" r="10" fill="#572932" opacity="0.7"/>
        <circle cx="42" cy="30" r="10" fill="#6b2d38" opacity="0.7"/>
        <circle cx="30" cy="42" r="10" fill="#8b243d" opacity="0.7"/>
        <circle cx="18" cy="30" r="10" fill="#a72845" opacity="0.7"/>
        {/* Center */}
        <circle cx="30" cy="30" r="14" fill="#572932"/>
        <circle cx="30" cy="30" r="10" fill="#6b2d38"/>
        <circle cx="30" cy="30" r="6" fill="#C9A227"/>
        {/* Small leaves */}
        <ellipse cx="12" cy="48" rx="10" ry="5" fill="#6b7c5e" opacity="0.6" transform="rotate(-30 12 48)"/>
        <ellipse cx="48" cy="48" rx="10" ry="5" fill="#8a9a7b" opacity="0.5" transform="rotate(30 48 48)"/>
      </svg>
    ),

    'frame-corner': (
      <svg viewBox="0 0 150 150" className={`${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Corner frame with florals */}
        <path d="M0 150 L0 30 Q0 0 30 0 L150 0" stroke="#572932" strokeWidth="2" fill="none" opacity="0.4"/>
        <path d="M10 150 L10 40 Q10 10 40 10 L150 10" stroke="#6b7c5e" strokeWidth="1" fill="none" opacity="0.3"/>

        {/* Corner rose */}
        <circle cx="30" cy="30" r="18" fill="#572932" opacity="0.9"/>
        <circle cx="30" cy="30" r="13" fill="#6b2d38" opacity="0.8"/>
        <circle cx="30" cy="30" r="8" fill="#8b243d" opacity="0.9"/>
        <circle cx="30" cy="30" r="4" fill="#C9A227"/>

        {/* Leaves spreading from corner */}
        <ellipse cx="60" cy="20" rx="20" ry="8" fill="#6b7c5e" opacity="0.6" transform="rotate(15 60 20)"/>
        <ellipse cx="20" cy="60" rx="20" ry="8" fill="#8a9a7b" opacity="0.5" transform="rotate(75 20 60)"/>
        <ellipse cx="80" cy="30" rx="16" ry="6" fill="#556649" opacity="0.5" transform="rotate(10 80 30)"/>
        <ellipse cx="30" cy="80" rx="16" ry="6" fill="#6b7c5e" opacity="0.5" transform="rotate(80 30 80)"/>

        {/* Small flowers */}
        <circle cx="55" cy="45" r="6" fill="#572932" opacity="0.6"/>
        <circle cx="45" cy="55" r="6" fill="#6b2d38" opacity="0.5"/>
        <circle cx="100" cy="15" r="5" fill="#a72845" opacity="0.4"/>
        <circle cx="15" cy="100" r="5" fill="#572932" opacity="0.4"/>
      </svg>
    ),
  };

  return decorations[variant] || null;
};

export default FloralDecoration;
