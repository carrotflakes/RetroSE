# RetroSE

RetroSE is a retro sound generator for Web browser.  
That plays score you wrote, with a square wave.  
Best for a tiny game's sounds.


## Usage

Load `retrose.js` in your HTLM and run the following:

```
// Generate a function from a musical score.
var se = RetroSE("cdfa");

// Call the function and sound it!
se();
```


## API
### function: RetroSE
`RetroSE(score)` generates a function which plays the `score`.

### number: RetroSE.volume
`RetroSE.volume` is the master volume, you can assign a number between `0` and `1`.
The default value is `0.1`.

### boolean: RetroSE.available
If RetroSE supports the browser, `RetroSE.available` is `true`. otherwise, `false`;


## Score notation
### Notes
`c`, `d`, `e`, `f`, `g`, `a` and `b` are notes.

`C`, `D`, `E`, `F`, `G`, `A` and `B` are notes raised one semitone.

`r` is a rest.

### Octave shift
`>` raises one octave all notes after that.

`<` lowers one octave all notes after that.


## Sample scores
```
c
```

```
c>c<c>c
```

```
>c<g
```

```
cCdDefFgGaAb>c
```

```
eeffaaffeeffaaff
```

```
baecea>d<bbb
```

```
ggaabbbbbbaaggrrggaabbaaggaaaaaa
```

```
ddggffaa
```

