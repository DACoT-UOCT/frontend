//transforma un objeto tipo Date a una fecha dia/mes/año
export const getFecha = (date) => {
  if (date === undefined) {
    return "Desconocido";
  }
  var temp = new Date(date);
  const string =
    temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
  return string;
};

const get_prev_phase = (phase, secuencias) => {
  if (secuencias.indexOf(phase) === -1) {
    return null;
  }
  var phaseIndex = secuencias.indexOf(phase);
  if (phaseIndex === 0) return secuencias[secuencias.length - 1];
  else return secuencias[phaseIndex - 1];
};
const compute_tables = (junc, seq) => {
  var max_phid = -1;
  var isys = {};

  junc["plans"].map((plan) => {
    var plid = plan["plid"];
    isys[plid] = {};
    plan["system_start"].map((sys) => {
      isys[plid][sys["phid"]] = sys["value"];
      if (sys["phid"] > max_phid) max_phid = sys["phid"];
      return null;
    });
    return null;
  });

  var eps = {};
  junc["intergreens"].map((intg) => {
    var intgfrom = parseInt(intg["phfrom"]);
    var intgto = parseInt(intg["phto"]);
    if (!eps.hasOwnProperty(intgfrom)) {
      eps[intgfrom] = {};
    }
    eps[intgfrom][intgto] = parseInt(intg["value"]);
    return null;
  });

  var evs = {};
  junc["veh_intergreens"].map((intg) => {
    var intgfrom = parseInt(intg["phfrom"]);
    var intgto = parseInt(intg["phto"]);
    if (!evs.hasOwnProperty(intgfrom)) evs[intgfrom] = {};
    evs[intgfrom][intgto] = parseInt(intg["value"]);
    return null;
  });

  var temp_res = {};
  junc["plans"].map((plan) => {
    var plid = plan["plid"];
    temp_res[plid] = {};
    Object.keys(isys[plid]).map((_phid) => {
      var ph_isys = isys[plid][_phid];
      var phid = parseInt(_phid);
      var pheps;
      var phevs;

      try {
        pheps = eps[get_prev_phase(phid, seq)][phid];
      } catch (error) {
        pheps = null;
      }

      try {
        phevs = evs[get_prev_phase(phid, seq)][phid];
      } catch (error) {
        phevs = null;
      }

      var ifs = ph_isys + pheps - phevs;
      var alpha = +(ifs > plan["cycle"]);
      ifs = ifs - alpha * plan["cycle"];
      var iv = ifs + phevs;
      var beta = +(iv > plan["cycle"]);
      iv = iv - beta * plan["cycle"];
      var row = [plid, plan["cycle"], ifs, phevs, iv, pheps, ph_isys];
      temp_res[plid][phid] = row;
      return null;
    });
    return null;
  });
  var final_result = {};
  Object.keys(temp_res).map((plid) => {
    var phases = temp_res[plid];

    final_result[plid] = {};
    seq.map((element, spidx) => {
      var phid = element;
      var row = phases[element];
      var phid_next;
      if (spidx + 1 === seq.length) phid_next = seq[0];
      else {
        phid_next = seq[spidx + 1];
      }

      var tvv;
      try {
        tvv = phases[phid_next][2] - row[4];
        var gamma = +(tvv < 0);
        tvv = tvv + gamma * row[1];
      } catch (error) {
        tvv = null;
      }

      var tvp;
      try {
        tvp =
          phases[phid_next][2] -
          row[4] -
          (phases[phid_next][5] - phases[phid_next][3]);
        var delta = +(tvp < 0);
        tvp = tvp + delta * row[1];
      } catch (error) {
        tvp = null;
      }

      var new_row;
      try {
        new_row = [
          row[0],
          row[1],
          row[2],
          row[3],
          row[4],
          tvv,
          tvp,
          row[5],
          row[6],
        ];
      } catch (error) {
        new_row = Array(9).fill(null);
      }

      final_result[plid][phid] = new_row;
      return null;
    });
    return null;
  });

  return final_result;
};

export const compute_interface = (junctions, seqs) => {
  const initial_plans = JSON.parse(JSON.stringify(junctions));
  var junctions_copy = junctions.map((junction) => {
    return junction.initial_junction;
  });
  //filter programs by seq
  for (var i = 0; i < seqs.length; i++) {
    let seq = seqs[i].seq;
    junctions_copy[i].plans.map((plan) => {
      plan["green_start"] = plan["green_start"].filter((gs) => {
        return seq.includes(gs["phid"]);
      });
      plan["pedestrian_green"] = plan["pedestrian_green"].filter((gs) => {
        return seq.includes(gs["phid"]);
      });
      plan["pedestrian_intergreen"] = plan["pedestrian_intergreen"].filter(
        (gs) => {
          return seq.includes(gs["phfrom"]) && seq.includes(gs["phto"]);
        }
      );
      plan["vehicle_intergreen"] = plan["vehicle_intergreen"].filter((gs) => {
        return seq.includes(gs["phfrom"]) && seq.includes(gs["phto"]);
      });
      plan["phase_start"] = plan["phase_start"].filter((gs) => {
        return seq.includes(gs["phid"]);
      });
      plan["system_start"] = plan["system_start"].filter((gs) => {
        return seq.includes(gs["phid"]);
      });
      plan["vehicle_green"] = plan["vehicle_green"].filter((gs) => {
        return seq.includes(gs["phid"]);
      });
      return null;
    });
  }

  //calcular tablas
  var result = junctions_copy.map((_junction, jIndex) => {
    var programaciones = _junction["plans"];
    var _veh_intergreens = programaciones[0]["vehicle_intergreen"];
    var _intergreens = programaciones[0]["pedestrian_intergreen"];
    var _plans = [];
    programaciones.map((programacion) => {
      _plans.push({
        cycle: programacion.cycle,
        plid: programacion.plid,
        system_start: programacion.system_start,
      });
      return null;
    });
    var formated_junction = {
      veh_intergreens: _veh_intergreens,
      intergreens: _intergreens,
      plans: _plans,
    };
    return compute_tables(formated_junction, seqs[jIndex].seq);
  });

  var formated_output = JSON.parse(JSON.stringify(junctions));

  formated_output.map((junction, junctionIndex) => {
    junction["junction"]["plans"].forEach((plan) => {
      //GREEN START, INDEX 4
      var _green_start = Object.keys(result[junctionIndex][plan["plid"]]).map(
        (fase) => {
          var _value = result[junctionIndex][plan["plid"]][fase][4];
          var temp = {
            phid: parseInt(fase),
            value: !_value ? "-" : parseInt(_value),
          };
          return temp;
        }
      ); //4
      plan["green_start"] = _green_start;

      //PEDESTRIAN GREEN
      var _pedestrian_green = Object.keys(
        result[junctionIndex][plan["plid"]]
      ).map((fase) => {
        var _value = result[junctionIndex][plan["plid"]][fase][6];
        var temp = {
          phid: parseInt(fase),
          value: !_value ? "-" : parseInt(_value),
        };
        return temp;
      });
      plan["pedestrian_green"] = _pedestrian_green;

      var _phase_start = Object.keys(result[junctionIndex][plan["plid"]]).map(
        (fase) => {
          var _value = result[junctionIndex][plan["plid"]][fase][2];
          var temp = {
            phid: parseInt(fase),
            value: !_value ? "-" : parseInt(_value),
          };
          return temp;
        }
      );
      plan["phase_start"] = _phase_start;

      var _vehicle_green = Object.keys(result[junctionIndex][plan["plid"]]).map(
        (fase) => {
          var _value = result[junctionIndex][plan["plid"]][fase][5];
          var temp = {
            phid: parseInt(fase),
            value: !_value ? "-" : parseInt(_value),
          };
          return temp;
        }
      );
      plan["vehicle_green"] = _vehicle_green;
      return null;
    });
    return null;
  });

  formated_output.map((junction, index) => {
    junction["initial_junction"]["plans"] =
      initial_plans[index]["initial_junction"]["plans"];
    return null;
  });
  return formated_output;
};
