(function () {
  "use strict";

  var D = window.PAN.data;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function chip(text, cls) {
    return '<span class="chip ' + (cls || "") + '">' + esc(text) + "</span>";
  }

  var viewEl = document.getElementById("view");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));

  /* ============================================================
     视图 1 · 总览（四段式框架 + 三条规律 + 时间轴 + 五阶段）
     ============================================================ */
  function viewOverview() {
    var h = "";
    h += '<div class="view-head"><div class="kicker">SYSTEM OVERVIEW</div><h2>' + esc(D.meta.title) + "</h2>";
    h += "<p>" + esc(D.meta.subtitle) + "</p><div class='rule'></div></div>";

    /* 关键总量指标 */
    h += '<div class="stage-chain">';
    var totals = [
      { v: "1191天", k: "全球紧急状态历时", accent: "#818CF8" },
      { v: "-3.0%", k: "2020 年全球 GDP", accent: "#FB7185" },
      { v: "≈4.4%", k: "中国三年复合增速", accent: "#F59E0B" },
      { v: "≈10万亿", k: "直接与间接经济损失（元）", accent: "#F472B6" }
    ];
    totals.forEach(function (t) {
      h += '<div class="stage" style="--accent:' + t.accent + '"><div class="stat"><span class="v">' + esc(t.v) +
        '</span><span class="k">' + esc(t.k) + "</span></div></div>";
    });
    h += "</div>";

    /* 四段式框架 */
    h += '<div class="view-head" style="margin-top:26px"><div class="kicker">ANALYTIC FRAMEWORK</div><h2>' +
      esc(D.framework.name) + "</h2><p>" + esc(D.framework.desc) + "</p></div>";

    h += '<div class="stage-chain">';
    D.framework.stages.forEach(function (s, i) {
      h += '<div class="stage" style="--accent:' + s.accent + '">';
      h += '<div class="stage-no">STAGE 0' + (i + 1) + "</div>";
      h += "<h3>" + esc(s.label) + "</h3>";
      h += '<div class="en">' + esc(s.en) + "</div>";
      h += '<div class="obj">' + esc(s.object) + "</div>";
      h += "<ul>" + s.metrics.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join("") + "</ul>";
      h += '<div class="ev"><span class="dot"></span><span>' + esc(s.evidence) + "</span></div>";
      h += "</div>";
    });
    h += "</div>";

    /* 三条规律 */
    h += '<div class="view-head" style="margin-top:26px"><div class="kicker">TRANSFERABLE LAWS</div><h2>' +
      esc(D.laws.title) + "</h2><p>" + esc(D.laws.desc) + "</p></div>";
    h += '<div class="laws">';
    D.laws.items.forEach(function (l) {
      h += '<div class="law"><div class="no">' + esc(l.no) + "</div><h4>" + esc(l.title) + "</h4><p>" +
        esc(l.body) + '</p><div class="src">' + esc(l.source) + "</div></div>";
    });
    h += "</div>";

    /* 时间轴 */
    h += '<div class="view-head" style="margin-top:30px"><div class="kicker">GLOBAL TIMELINE</div><h2>' +
      esc(D.timeline.title) + "</h2><p>" + esc(D.timeline.desc) + "</p></div>";
    h += '<div class="card" style="padding:22px"><div class="timeline">';
    D.timeline.events.forEach(function (e) {
      h += '<div class="tl-item"><span class="tl-dot"></span><span class="tl-date">' + esc(e.date) +
        '</span><span class="tl-tag">' + chip(e.tag, "indigo") + "</span><h5>" + esc(e.title) +
        "</h5><p>" + esc(e.note) + "</p></div>";
    });
    h += "</div></div>";

    /* 五阶段 */
    h += '<div class="view-head" style="margin-top:30px"><div class="kicker">CHINA PHASES</div><h2>' +
      esc(D.phases.title) + "</h2><p>" + esc(D.phases.desc) + "</p></div>";
    h += '<div class="card"><div class="phase-stack">';
    D.phases.items.forEach(function (p) {
      h += '<div class="phase"><div><div class="ph-name">' + esc(p.name) + '</div><div class="ph-range">' +
        esc(p.range) + '</div></div><div class="ph-trigger">触发：<b>' + esc(p.trigger) +
        '</b></div><div class="ph-mark">' + esc(p.mark) + "</div></div>";
    });
    h += "</div></div>";

    h += '<div class="callout"><b>使用方式：</b>把任何一次新冲击按同样的四个环节填一遍，缺哪一格就是当前信息缺口所在；第三行与第四行最值得注意——政策对冲规模决定短期止血效果，也直接决定结构残留深度，二者是同一枚硬币的两面。</div>';
    viewEl.innerHTML = h;
  }

  /* ============================================================
     视图 2 · 行业冲击
     ============================================================ */
  function viewIndustry() {
    var h = "";
    h += '<div class="view-head"><div class="kicker">SECTOR IMPACT</div><h2>' + esc(D.industries.title) +
      "</h2><p>" + esc(D.industries.desc) + "</p></div>";

    D.industries.groups.forEach(function (g) {
      h += '<div class="indus tone-' + g.tone + '">';
      h += '<div class="indus-head"><h3>' + esc(g.label) + "</h3>" +
        '<span class="indus-name">' + esc(g.name) + "</span>" +
        chip(g.tier, g.tone === "danger" ? "danger" : g.tone === "success" ? "success" : g.tone === "warn" ? "warn" : "danger") +
        "</div>";
      h += '<div class="indus-body"><div class="indus-narrative"><p>' + esc(g.narrative) +
        '</p><div class="after">疫后演化 · ' + esc(g.after) + "</div></div>";
      h += '<div class="indus-stats">';
      g.stats.forEach(function (s) {
        h += '<div class="mini-stat"><div class="ms-v">' + esc(s.v) + '</div><div class="ms-k">' + esc(s.k) +
          " · " + esc(s.u) + '</div><div class="ms-d">' + esc(s.d) + "</div></div>";
      });
      h += "</div></div></div>";
    });
    viewEl.innerHTML = h;
  }

  /* ============================================================
     视图 3 · 历史对标
     ============================================================ */
  function viewBenchmark() {
    var h = "";
    h += '<div class="view-head"><div class="kicker">HISTORICAL BENCHMARK</div><h2>' + esc(D.benchmarks.title) +
      "</h2><p>" + esc(D.benchmarks.desc) + "</p></div>";

    D.benchmarks.mirrors.forEach(function (m) {
      h += '<div class="mirror"><div class="mirror-side"><div>';
      h += '<div class="no">' + esc(m.no) + "</div>";
      h += "<h3>" + esc(m.name) + "</h3>";
      h += '<div class="kicker">' + esc(m.tag) + "</div>";
      h += "</div><p>" + esc(m.kicker) + "</p></div>";
      h += '<div class="mirror-main">';
      h += '<div class="simdiff"><div class="cell"><b>相似点</b>' + esc(m.sim) + '</div><div class="cell"><b>差异点</b>' +
        esc(m.diff) + "</div></div>";
      h += '<div class="ml-body">' + esc(m.body) + '</div><div class="ml-lesson">' + esc(m.lesson) + "</div>";
      h += "</div></div>";
    });

    /* 疫后沉淀 */
    h += '<div class="view-head" style="margin-top:30px"><div class="kicker">STRUCTURAL RESIDUE</div><h2>' +
      esc(D.residues.title) + "</h2></div>";
    h += '<div class="grid g4">';
    D.residues.items.forEach(function (r) {
      h += '<div class="card"><div class="kicker-mini">RESIDUE</div><div class="card-title">' + esc(r.key) +
        '</div><p style="font-size:12.5px;color:var(--text-2)">' + esc(r.body) +
        '</p><div class="stat" style="margin-top:12px"><span class="k">证据</span><span class="v" style="font-size:15px;color:var(--amber)">' +
        esc(r.evidence) + "</span></div></div>";
    });
    h += "</div>";
    viewEl.innerHTML = h;
  }

  /* ============================================================
     视图 4 · 灰犀牛监测
     ============================================================ */
  function viewRhino() {
    var h = "";
    h += '<div class="view-head"><div class="kicker">GREY RHINOCEROS MONITOR</div><h2>' + esc(D.rhinos.title) +
      "</h2><p>" + esc(D.rhinos.desc) + "</p></div>";

    h += '<div class="rhino-grid">';
    D.rhinos.list.forEach(function (r) {
      h += '<div class="card rhino tone-' + r.tone + '">';
      h += '<div class="rhino-head"><span class="rhino-no">' + esc(r.no) + "</span>" + chip(r.tag, r.tone) + "</div>";
      h += "<h4>" + esc(r.name) + "</h4>";
      h += '<p class="rhino-body">' + esc(r.desc) + "</p>";
      h += '<div class="kicker-mini">监测指标 · 预警阈值</div>';
      r.indicators.forEach(function (ind) {
        h += '<div class="indicator"><div class="in-m">' + esc(ind.m) + '</div><div class="in-src">来源：' +
          esc(ind.src) + '</div><div class="in-t">' + esc(ind.t) + "</div></div>";
      });
      h += "</div>";
    });
    h += "</div>";

    /* 共振配对 */
    h += '<div class="view-head" style="margin-top:30px"><div class="kicker">RESONANCE ALERTS</div><h2>三组共振配对 · 联动告警</h2>';
    h += "<p>指标之间存在联动关系，共振识别比单点预警更重要。任一组两个指标同时越线即提升整体风险等级。采集频率：债券市场与贸易数据月度、人口与矿产缺口年度、企业风险调查按发布周期。</p></div>";
    D.rhinos.resonances.forEach(function (r) {
      h += '<div class="reso"><div class="no">' + esc(r.no) + "</div><div><h5>" + esc(r.pair) +
        "</h5><p>" + esc(r.body) + '</p></div><span class="watch">' + esc(r.watch) + "</span></div>";
    });
    viewEl.innerHTML = h;
  }

  /* ============================================================
     视图 5 · 情景推演器
     ============================================================ */
  var engineState = { debt: "ok", geo: "calm" };

  function currentScenarioKey() {
    return D.scenarios.matrix[engineState.debt + "_" + engineState.geo];
  }

  function scenCardHTML() {
    var s = D.scenarios.map[currentScenarioKey()];
    var clamp = s.bench;
    var h = '<div class="scen-card scen-tone-' + s.tone + '">';
    h += '<div class="scen-head"><h3>' + esc(s.name) + '<span class="code">' + esc(s.code) + "</span></h3></div>";
    h += '<div class="scen-body">';
    h += '<div class="scen-block"><h5>触发条件 · Trigger</h5><div class="big">' + esc(s.trigger) + "</div></div>";
    h += '<div class="scen-block"><h5>宏观特征 · Macro</h5><div class="big">' + esc(s.macro) + "</div></div>";
    h += '<div class="scen-block"><h5>行业受损 · Losers</h5><ul class="losers">' +
      s.losers.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    h += '<div class="scen-block"><h5>行业受益 · Winners</h5><ul class="winners">' +
      s.winners.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    h += '<div class="scen-meta"><span class="sm"><b>历史参照</b>　' + esc(clamp) +
      '</span><span class="sm"><b>不确定性</b>　' + esc(s.prob) + "</span></div>";
    h += "</div></div>";
    return h;
  }

  function renderMatrix() {
    var board = document.querySelector(".matrix-3x3");
    if (!board) return;
    board.innerHTML = "";
    var labels = { debt: ["可控", "高企", "危机"], geo: ["缓和", "紧张", "升级"] };
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        var dv = D.scenarios.axis[0].options[r].v;
        var gv = D.scenarios.axis[1].options[c].v;
        var sKey = D.scenarios.matrix[dv + "_" + gv];
        var s = D.scenarios.map[sKey];
        var sel = (engineState.debt === dv && engineState.geo === gv);
        var el = document.createElement("button");
        el.className = "cell3" + (sel ? " sel" : "");
        el.setAttribute("data-debt", dv);
        el.setAttribute("data-geo", gv);
        el.title = s.name;
        el.innerHTML = '<span class="s-code">' + s.code + "</span><span class=\"s-name\">" + esc(s.name.replace(/情景[一二三]\s*·\s*/, s.code + " · ")) + "</span>";
        el.addEventListener("click", function () {
          engineState.debt = this.getAttribute("data-debt");
          engineState.geo = this.getAttribute("data-geo");
          syncEngine();
        });
        board.appendChild(el);
      }
    }
  }

  function syncEngine() {
    /* 轴按钮 */
    var axisBtns = document.querySelectorAll(".axis-row");
    axisBtns.forEach(function (row) {
      var axisKey = row.getAttribute("data-axis");
      row.querySelectorAll(".seg button").forEach(function (b) {
        b.classList.toggle("active", b.getAttribute("data-v") === engineState[axisKey]);
      });
    });
    renderMatrix();
    var out = document.getElementById("scen-result");
    if (out) out.innerHTML = scenCardHTML();
  }

  function wireAxis() {
    document.querySelectorAll(".axis-row").forEach(function (row) {
      var axisKey = row.getAttribute("data-axis");
      row.querySelectorAll(".seg button").forEach(function (b) {
        b.addEventListener("click", function () {
          engineState[axisKey] = this.getAttribute("data-v");
          syncEngine();
        });
      });
    });
  }

  function viewScenario() {
    var h = "";
    h += '<div class="view-head"><div class="kicker">SCENARIO ENGINE</div><h2>' + esc(D.scenarios.title) +
      "</h2><p>" + esc(D.scenarios.desc) + "</p></div>";

    h += '<div class="engine"><div class="matrix-panel">';
    h += "<h4>推演主轴 · 调整债务与地缘状态</h4>";
    h += '<div class="matrix-axes">';
    D.scenarios.axis.forEach(function (ax) {
      h += '<div class="axis-row" data-axis="' + ax.key + '"><span class="axis-label">' + esc(ax.label) +
        '</span><div class="seg">';
      ax.options.forEach(function (o) {
        var act = engineState[ax.key] === o.v ? " active" : "";
        h += '<button data-v="' + o.v + '" class="' + act.trim() + '">' + esc(o.label) + "</button>";
      });
      h += "</div></div>";
    });
    h += "</div>";
    h += '<div class="matrix-board"><div class="mb-label mb-debt">债务 →</div><div class="mb-label mb-geo">地缘 →</div>';
    h += '<div style="height:16px"></div><div class="matrix-3x3"></div></div>';
    h += '<div class="map-legend">';
    h += '<span class="lg"><span class="sw" style="background:var(--emerald)"></span>S1 温和修复</span>';
    h += '<span class="lg"><span class="sw" style="background:var(--amber)"></span>S2 滞胀拉锯</span>';
    h += '<span class="lg"><span class="sw" style="background:var(--rose)"></span>S3 系统性共振</span>';
    h += "</div></div>";
    h += '<div id="scen-result"></div>';
    h += "</div>";
    viewEl.innerHTML = h;
    wireAxis();
    renderMatrix();
    document.getElementById("scen-result").innerHTML = scenCardHTML();
  }

  /* ============================================================
     视图 6 · 决策建议
     ============================================================ */
  function viewAdvice() {
    var h = "";
    h += '<div class="view-head"><div class="kicker">DECISION PLAYBOOK</div><h2>' + esc(D.decisions.title) +
      "</h2></div>";
    h += '<div class="advice">';
    D.decisions.items.forEach(function (a) {
      h += '<div class="adv-row"><div class="adv-no">' + esc(a.no) + '</div><div><div class="adv-name">' +
        esc(a.name) + "</div><div class=\"adv-body\">" + esc(a.body) + "</div></div></div>";
    });
    h += "</div>";

    h += '<div class="view-head" style="margin-top:30px"><div class="kicker">DATA GAPS</div><h2>' + esc(D.gaps.title) +
      "</h2><p>" + esc(D.gaps.desc) + "</p></div>";
    D.gaps.items.forEach(function (g) {
      h += '<div class="gap-row"><div class="g-name">' + esc(g.no) + " · " + esc(g.name) +
        '</div><div class="g-impact">' + esc(g.impact) + '</div><span class="g-prio">优先度 ' + esc(g.priority) + " · " +
        esc(g.note) + "</span></div>";
    });
    h += '<div class="callout"><b>方法局限：</b>' + esc(D.gaps.method) + "</div>";

    h += '<div class="view-head" style="margin-top:30px"><div class="kicker">SCOPE</div><h2>' + esc(D.coverage.title) +
      "</h2></div>";
    h += '<ul class="coverage">' + D.coverage.items.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul>";
    viewEl.innerHTML = h;
  }

  /* ============================================================
     路由
     ============================================================ */
  var views = {
    overview: viewOverview,
    industry: viewIndustry,
    benchmark: viewBenchmark,
    rhino: viewRhino,
    scenario: viewScenario,
    advice: viewAdvice
  };

  function go(name) {
    if (!views[name]) name = "overview";
    tabs.forEach(function (t) {
      t.classList.toggle("active", t.getAttribute("data-view") === name);
    });
    views[name]();
    viewEl.scrollTop = 0;
    window.scrollTo({ top: 0 });
    if (history.replaceState) {
      history.replaceState(null, "", "#" + name);
    }
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { go(this.getAttribute("data-view")); });
  });

  var initial = (location.hash || "").replace("#", "");
  go(views[initial] ? initial : "overview");
})();