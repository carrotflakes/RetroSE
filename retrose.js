(function(window) {

	var context, masterGain;

	function RetroSE(src) {
		var events = parseScore(src);

		return function play(delay) {
			delay = delay || 0;
			var time = context.currentTime + delay;
			var gain = context.createGain();
			gain.gain.value = 1;
			var osc = context.createOscillator();
			osc.type="square";
			osc.connect(gain);
			gain.connect(masterGain);

			osc.start(time);
			var eventsLength = events.length;
			for (var i = 0; i < eventsLength; ++i) {
				var event = events[i];
				var etime = time + 0.1 * i;
				if (event.type === "note") {
					gain.gain.setValueAtTime(1, etime);
					osc.frequency.setValueAtTime(event.frequency, etime);
				} else if (event.type === "rest") {
					gain.gain.setValueAtTime(0, etime);
				}
			}
			osc.stop(time + 0.1 * eventsLength);
		};
	}


	RetroSE.context = null;
	RetroSE.available = false;


  Object.defineProperty(RetroSE, 'volume', {
    get: function() {
      return masterGain.gain.value;
    },
    set: function(value) {
      masterGain.gain.value = value;
    },
  });


	function parseScore(src) {
		var events = [];
		var baseNoteNumber = 60;
		for (var i = 0; i < src.length; ++i) {
			var cc = src[i].charCodeAt();
			if ("a".charCodeAt() <= cc &&
					cc <= "g".charCodeAt()) {
				var o = cc - "a".charCodeAt();
				var noteNumber = baseNoteNumber + [9,11,0,2,4,5,7][o];
				events.push({
					type: "note",
					noteNumber: noteNumber,
					frequency: 440 * Math.pow(2, (noteNumber - 60) / 12),
				});
			} else if ("A".charCodeAt() <= cc &&
					cc <= "G".charCodeAt()) {
				var o = cc - "A".charCodeAt();
				var noteNumber = baseNoteNumber + [9,11,0,2,4,5,7][o] + 1;
				events.push({
					type: "note",
					noteNumber: noteNumber,
					frequency: 440 * Math.pow(2, (noteNumber - 60) / 12),
				});
			} else if (src[i] === "r") {
				events.push({
					type: "rest",
				});
			} else if (src[i] === "<") {
				baseNoteNumber -= 12;
			} else if (src[i] === ">") {
				baseNoteNumber += 12;
			}
		}
		return events;
	}


	try {
		if ("AudioContext" in window) {
			RetroSE.context = context = new AudioContext();

			masterGain = context.createGain();
			masterGain.gain.value = 0.1;
			masterGain.connect(context.destination);

			RetroSE.available = true;
		}
	} catch (e) {
		context = null;
	}

	window.RetroSE = RetroSE;

})(window);
