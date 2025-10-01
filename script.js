		/* Prosty „matrix myśli” – losowo rozmieszcza i animuje frazy */
		const phrases = [
			"I'm not good enough", "I'm afraid", "I hate myself", "I feel lost", "I don't belong",
			"What if I fail?", "Why can't I change?", "I'm too much", "I'm not enough", "No one understands",
			"I'm tired", "It’s my fault", "I should be better", "I’m broken", "I can’t"
		];
		const matrix = document.getElementById('matrix');
		const W = () => matrix.clientWidth, H = () => matrix.clientHeight;
		const make = (t, i) => {
			const el = document.createElement('span');
			el.className = 'phrase';
			el.textContent = t;
			// losowe pozycje i opóźnienia
			const x = Math.random() * (W() - 200) + 20;
			const y = Math.random() * (H() - 60) + 10;
			el.style.left = x + 'px';
			el.style.top = y + 'px';
			el.style.fontSize = (Math.random() * 10 + 13) + 'px';
			el.style.animationDelay = (Math.random() * 4) + 's';
			el.style.animationDuration = (Math.random() * 4 + 4) + 's';
			matrix.appendChild(el);
		};
		function populate(n = 28) {
			matrix.innerHTML = '';
			for (let i = 0; i < n; i++) {
				make(phrases[i % phrases.length], i);
			}
		}
		window.addEventListener('resize', () => populate());
		populate();
