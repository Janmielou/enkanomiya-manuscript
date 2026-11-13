(function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Scroll reveal: only hide elements when JS + motion are available,
       so the manuscript is fully visible without JavaScript. */
    var reveals = document.querySelectorAll('.reveal');
    if (!reduce && 'IntersectionObserver' in window) {
        reveals.forEach(function (el) { el.classList.add('pre'); });
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
        reveals.forEach(function (el) { io.observe(el); });
    }

    /* Sparse golden dust motes drifting through the archive air. */
    if (!reduce) {
        var holder = document.getElementById('motes');
        if (holder) {
            for (var i = 0; i < 14; i++) {
                var s = document.createElement('span');
                s.className = 'mote';
                var size = 2 + Math.random() * 3;
                s.style.width = size + 'px';
                s.style.height = size + 'px';
                s.style.left = (Math.random() * 100) + 'vw';
                s.style.top = (Math.random() * 100) + 'vh';
                s.style.animationDuration = (10 + Math.random() * 16) + 's';
                s.style.animationDelay = (-Math.random() * 24) + 's';
                holder.appendChild(s);
            }
        }
    }

    /* ---------- ambient sound: a playlist of looping tracks ----------*/
    var TRACKS = [
        { src: 'audio/hope-or-nostalgia.mp3', volume: 0.50 },
        { src: 'audio/tearless-souls-of-byakuya.mp3', volume: 0.50 },
        { src: 'audio/drift-along-the-lethe.mp3', volume: 0.50 },
        { src: 'audio/now-and-forevermore.mp3', volume: 0.50 }
    ];
    var MODE = 'queue'; // 'layer' or 'queue'

    var soundBtn = document.getElementById('sound-toggle');
    if (soundBtn && TRACKS.length) {
        var audios = TRACKS.map(function (t) {
            var a = new Audio();
            a.src = t.src;
            a.preload = 'none';
            a.loop = (MODE === 'layer');
            a.volume = 0;
            return a;
        });
        var queueIdx = 0;
        var playing = false;

        function ramp(a, target, ms) {
            var from = a.volume, t0 = performance.now();
            (function step() {
                var k = Math.min(1, (performance.now() - t0) / ms);
                a.volume = from + (target - from) * k;
                if (k < 1 && !a.paused) { requestAnimationFrame(step); }
            })();
        }
        function syncBtn() {
            soundBtn.classList.toggle('playing', playing);
            soundBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
            soundBtn.setAttribute('aria-label', playing ? 'Pause ambient sound' : 'Play ambient sound');
        }
        function start() {
            playing = true;
            if (MODE === 'layer') {
                audios.forEach(function (a, i) {
                    var p = a.play();
                    if (p && p.catch) { p.catch(function () { }); }
                    ramp(a, TRACKS[i].volume, 2200);
                });
            } else {
                queueIdx = 0;
                var a0 = audios[0];
                var p0 = a0.play();
                if (p0 && p0.catch) { p0.catch(function () { }); }
                ramp(a0, TRACKS[0].volume, 2500);
            }
            syncBtn();
        }
        function stop() {
            playing = false;
            audios.forEach(function (a) { a.pause(); });
            syncBtn();
        }
        audios.forEach(function (a, i) {
            a.addEventListener('ended', function () {
                if (!playing || MODE !== 'queue') { return; }
                ramp(a, 0, 500);
                queueIdx = (i + 1) % audios.length;
                setTimeout(function () {
                    if (!playing) { return; }
                    var n = audios[queueIdx];
                    var p = n.play();
                    if (p && p.catch) { p.catch(function () { }); }
                    ramp(n, TRACKS[queueIdx].volume, 2500);
                }, 550);
            });
        });
        soundBtn.addEventListener('click', function () {
            if (playing) { stop(); } else { start(); }
        });
        document.addEventListener('visibilitychange', function () {
            if (document.hidden && playing) { stop(); }
        });
        soundBtn.classList.add('ready'); // reveal the button only when JS is running
        window.__ambience = audios;     // debug handle: check in DevTools console
    }

    /* ---------- celestial sparkles trailing the cursor ----------
       Fine pointers only; disabled with reduced motion. */
    if (!reduce && window.matchMedia('(pointer: fine)').matches) {
        var sparkHolder = document.getElementById('motes');
        var lastSpark = 0, liveSparks = 0;
        if (sparkHolder) {
            document.addEventListener('pointermove', function (e) {
                var now = performance.now();
                if (now - lastSpark < 110 || liveSparks > 20) { return; }
                lastSpark = now;
                var s = document.createElement('span');
                s.className = 'spark';
                var size = 3 + Math.random() * 5;
                s.style.width = size + 'px';
                s.style.height = size + 'px';
                s.style.left = (e.clientX + (Math.random() * 16 - 8)) + 'px';
                s.style.top = (e.clientY + (Math.random() * 16 - 8)) + 'px';
                s.style.animationDuration = (0.8 + Math.random() * 0.9) + 's';
                sparkHolder.appendChild(s);
                liveSparks++;
                s.addEventListener('animationend', function () {
                    s.remove();
                    liveSparks--;
                });
            }, { passive: true });
        }
    }
})();
