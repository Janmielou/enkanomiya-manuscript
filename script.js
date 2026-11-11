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
        })();
