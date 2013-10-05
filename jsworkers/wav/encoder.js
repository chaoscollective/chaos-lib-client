
// see: https://ccrma.stanford.edu/courses/422/projects/WaveFormat/


function interleave(chanData){
  var chans  = chanData.length;
  if(chans === 1) return chanData[0];
  var l0     = chanData[0].length;
  var length = l0 * chans;
  var result = new Float32Array(length);
  // --
  var index = 0;
  var inputIndex = 0;
  for(var i=0; i<l0; i++){
    for(var c=0; c<chans; c++){
      result[i*chans+c] = chanData[c][i];
    }
  }
  console.log(result);
  return result;
}
function floatTo16BitPCM(output, offset, input){
  try{
    for (var i = 0; i < input.length; i++, offset+=2){
      var s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }catch(ex){
    console.warn("float to 16BitPM Err: i", i, ", offset", offset);
    console.log(ex);
  }
}
function wr(view, offset, string){
  for (var i = 0; i < string.length; i++){
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}  



  // interleavedChannels = interleavedChannels||1;
  // console.log("encoding wav: samples:"+samples.length+", chans:"+interleavedChannels+", rate:"+sampleRate);
  // var buffer  = new ArrayBuffer(44 + samples.length * 2); // 44 + PCM points * 2
  // var dv      = new DataView(buffer);
  // // -- header
  // wr(dv, 0, 'RIFF');   // RIFF
  // dv.setUint32(4, 32 + samples.length * interleavedChannels, true); // 32 + length
  // wr(dv, 8, 'WAVE');   // RIFF type
  // // -- chunk 1
  // wr(dv, 12, 'fmt ');  // chunk id
  // dv.setUint32(16, 16, true);   // subchunk1size (16 for PCM)
  // dv.setUint16(20, 1, true);    // 1=PCM
  // dv.setUint16(22, interleavedChannels, true); // num channels
  // dv.setUint32(24, sampleRate, true);          // samplerate
  // dv.setUint32(28, sampleRate * interleavedChannels * 2, true); // byterate
  // dv.setUint16(32, 2 * interleavedChannels, true);  // block align
  // dv.setUint16(34, 16, true); // bits per sample (16 = 2 bytes)
  // // -- chunk 2
  // wr(dv, 36, 'data');         // data chunk id
  // dv.setUint32(40, samples.length * interleavedChannels, true); // chunk len
  // // --
  // floatTo16BitPCM(dv, 44, samples);


self.onmessage = function(e) {
  var mp3data;
  switch (e.data.cmd) {
  case 'init':
    e.data.config   = e.data.config||{};
    var chans       = e.data.config.channels || 1;
    var len         = e.data.config.len || 0;
    if(!len) return console.warn("wav: no len specified.");
    var samplerate  =  e.data.config.in_samplerate || 44100;
    // --
    var buffer  = new ArrayBuffer(44); // + samples.length * 2); // 44 + PCM points * 2
    var dv      = new DataView(buffer);
    // -- header
    wr(dv, 0, 'RIFF');   // RIFF
    dv.setUint32(4, 32 + len * chans, true); // 32 + length
    wr(dv, 8, 'WAVE');   // RIFF type
    // -- chunk 1
    wr(dv, 12, 'fmt ');  // chunk id
    dv.setUint32(16, 16, true);   // subchunk1size (16 for PCM)
    dv.setUint16(20, 1, true);    // 1=PCM
    dv.setUint16(22, chans, true); // num channels
    dv.setUint32(24, samplerate, true);          // samplerate
    dv.setUint32(28, samplerate * chans * 2, true); // byterate
    dv.setUint16(32, 2 * chans, true);  // block align
    dv.setUint16(34, 16, true); // bits per sample (16 = 2 bytes)
    // -- chunk 2
    wr(dv, 36, 'data');         // data chunk id
    dv.setUint32(40, len * chans, true); // chunk len
    // --
    console.log("wav: chunk1 -> ", buffer);
    self.postMessage({cmd: 'data', buf: buffer});
    // --
    // mp3codec = Lame.init();
    // var chans = e.data.config.channels || 2; 
    // Lame.set_mode(mp3codec, e.data.config.mode || (chans===1)?Lame.MONO:Lame.JOINT_STEREO);
    // Lame.set_num_channels(mp3codec, chans);
    // Lame.set_in_samplerate(mp3codec, e.data.config.in_samplerate || 44100);
    // Lame.set_out_samplerate(mp3codec, e.data.config.out_samplerate || 44100);
    // if(!e.data.config.vbr){
    //   Lame.set_bitrate(mp3codec, e.data.config.bitrate || 128);
    // }else{
    //   Lame.set_VBR(mp3codec, e.data.config.vbr || 1); 
    //   Lame.set_VBR_min_bitrate_kbps(mp3codec, e.data.config.vbr_min || 16);
    //   Lame.set_VBR_max_bitrate_kbps(mp3codec, e.data.config.vbr_max || 128);
    //   Lame.set_VBR_q(mp3codec, e.data.config.vbr_q || 4);
    // }
    // Lame.init_params(mp3codec);
    break;
  case 'encode':
    // mp3data = Lame.encode_buffer_ieee_float(mp3codec, e.data.buf1, e.data.buf2||e.data.buf1);
    // self.postMessage({cmd: 'data', buf: mp3data.data});
    break;
  case 'finish':
    // mp3data = Lame.encode_flush(mp3codec);
    // self.postMessage({cmd: 'end', buf: mp3data.data});
    // Lame.close(mp3codec);
    // mp3codec = null;
    break;
  }
};