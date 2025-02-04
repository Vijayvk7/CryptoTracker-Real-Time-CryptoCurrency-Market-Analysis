import {
  __toESM,
  require_react
} from "./chunk-ATZAHYIB.js";

// node_modules/react-google-charts/dist/index.js
var React = __toESM(require_react());
var import_react = __toESM(require_react());
function useLoadScript(src, onLoad, onError) {
  (0, import_react.useEffect)(() => {
    if (!document) {
      return;
    }
    const foundScript = document.querySelector('script[src="'.concat(src, '"]'));
    if (foundScript === null || foundScript === void 0 ? void 0 : foundScript.dataset.loaded) {
      onLoad === null || onLoad === void 0 ? void 0 : onLoad();
      return;
    }
    const script = foundScript || document.createElement("script");
    if (!foundScript) {
      script.src = src;
    }
    const onLoadWithMarker = () => {
      script.dataset.loaded = "1";
      onLoad === null || onLoad === void 0 ? void 0 : onLoad();
    };
    script.addEventListener("load", onLoadWithMarker);
    if (onError) {
      script.addEventListener("error", onError);
    }
    if (!foundScript) {
      document.head.append(script);
    }
    return () => {
      script.removeEventListener("load", onLoadWithMarker);
      if (onError) {
        script.removeEventListener("error", onError);
      }
    };
  }, []);
}
function useLoadGoogleCharts(param) {
  let { chartVersion = "current", chartPackages = [
    "corechart",
    "controls"
  ], chartLanguage = "en", mapsApiKey } = param;
  const [googleCharts, setGoogleCharts] = (0, import_react.useState)(null);
  const [failed, setFailed] = (0, import_react.useState)(false);
  useLoadScript("https://www.gstatic.com/charts/loader.js", () => {
    const google = window === null || window === void 0 ? void 0 : window.google;
    if (!google) {
      return;
    }
    google.charts.load(chartVersion, {
      packages: chartPackages,
      language: chartLanguage,
      mapsApiKey
    });
    google.charts.setOnLoadCallback(() => {
      setGoogleCharts(google);
    });
  }, () => {
    setFailed(true);
  });
  return [
    googleCharts,
    failed
  ];
}
function LoadGoogleCharts(param) {
  let { onLoad, onError, ...params } = param;
  const [googleCharts, failed] = useLoadGoogleCharts(params);
  (0, import_react.useEffect)(() => {
    if (googleCharts && onLoad) {
      onLoad(googleCharts);
    }
  }, [
    googleCharts
  ]);
  (0, import_react.useEffect)(() => {
    if (failed && onError) {
      onError();
    }
  }, [
    failed
  ]);
  return null;
}
var chartDefaultProps = {
  // <DEPRECATED_PROPS>
  legend_toggle: false,
  // </DEPRECATED_PROPS>
  options: {},
  legendToggle: false,
  getChartWrapper: () => {
  },
  spreadSheetQueryParameters: {
    headers: 1,
    gid: 1
  },
  rootProps: {},
  chartWrapperParams: {}
};
var uniqueID = 0;
var generateUniqueID = () => {
  uniqueID += 1;
  return "reactgooglegraph-".concat(uniqueID);
};
var DEFAULT_CHART_COLORS = [
  "#3366CC",
  "#DC3912",
  "#FF9900",
  "#109618",
  "#990099",
  "#3B3EAC",
  "#0099C6",
  "#DD4477",
  "#66AA00",
  "#B82E2E",
  "#316395",
  "#994499",
  "#22AA99",
  "#AAAA11",
  "#6633CC",
  "#E67300",
  "#8B0707",
  "#329262",
  "#5574A6",
  "#3B3EAC"
];
var loadDataTableFromSpreadSheet = async function(googleViz, spreadSheetUrl) {
  let urlParams = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return new Promise((resolve, reject) => {
    const headers = "".concat(urlParams.headers ? "headers=".concat(urlParams.headers) : "headers=0");
    const queryString = "".concat(urlParams.query ? "&tq=".concat(encodeURIComponent(urlParams.query)) : "");
    const gid = "".concat(urlParams.gid ? "&gid=".concat(urlParams.gid) : "");
    const sheet = "".concat(urlParams.sheet ? "&sheet=".concat(urlParams.sheet) : "");
    const access_token = "".concat(urlParams.access_token ? "&access_token=".concat(urlParams.access_token) : "");
    const urlQueryString = "".concat(headers).concat(gid).concat(sheet).concat(queryString).concat(access_token);
    const urlToSpreadSheet = "".concat(spreadSheetUrl, "/gviz/tq?").concat(urlQueryString);
    const query = new googleViz.visualization.Query(urlToSpreadSheet);
    query.send((response) => {
      if (response.isError()) {
        reject("Error in query:  ".concat(response.getMessage(), " ").concat(response.getDetailedMessage()));
      } else {
        resolve(response.getDataTable());
      }
    });
  });
};
var { Provider, Consumer } = React.createContext(chartDefaultProps);
var ContextProvider = (param) => {
  let { children, value } = param;
  return React.createElement(Provider, {
    value
  }, children);
};
var ContextConsumer = (param) => {
  let { render } = param;
  return React.createElement(Consumer, null, (context) => {
    return render(context);
  });
};
var GRAY_COLOR = "#CCCCCC";
var GoogleChartDataTableInner = class extends React.Component {
  componentDidMount() {
    this.draw(this.props);
    window.addEventListener("resize", this.onResize);
    if (this.props.legend_toggle || this.props.legendToggle) {
      this.listenToLegendToggle();
    }
  }
  componentWillUnmount() {
    const { google, googleChartWrapper } = this.props;
    window.removeEventListener("resize", this.onResize);
    google.visualization.events.removeAllListeners(googleChartWrapper);
    if (googleChartWrapper.getChartType() === "Timeline") {
      googleChartWrapper.getChart() && googleChartWrapper.getChart().clearChart();
    }
  }
  componentDidUpdate() {
    this.draw(this.props);
  }
  render() {
    return null;
  }
  constructor(...args) {
    super(...args);
    this.state = {
      hiddenColumns: []
    };
    this.listenToLegendToggle = () => {
      const { google, googleChartWrapper } = this.props;
      google.visualization.events.addListener(googleChartWrapper, "select", () => {
        const chart = googleChartWrapper.getChart();
        const selection = chart.getSelection();
        const dataTable = googleChartWrapper.getDataTable();
        if (selection.length === 0 || // We want to listen to when a whole row is selected. This is the case only when row === null
        selection[0].row || !dataTable) {
          return;
        }
        const columnIndex = selection[0].column;
        const columnID = this.getColumnID(dataTable, columnIndex);
        if (this.state.hiddenColumns.includes(columnID)) {
          this.setState((state) => ({
            ...state,
            hiddenColumns: [
              ...state.hiddenColumns.filter((colID) => colID !== columnID)
            ]
          }));
        } else {
          this.setState((state) => ({
            ...state,
            hiddenColumns: [
              ...state.hiddenColumns,
              columnID
            ]
          }));
        }
      });
    };
    this.applyFormatters = (dataTable, formatters) => {
      const { google } = this.props;
      for (let formatter of formatters) {
        switch (formatter.type) {
          case "ArrowFormat": {
            const vizFormatter = new google.visualization.ArrowFormat(formatter.options);
            vizFormatter.format(dataTable, formatter.column);
            break;
          }
          case "BarFormat": {
            const vizFormatter = new google.visualization.BarFormat(formatter.options);
            vizFormatter.format(dataTable, formatter.column);
            break;
          }
          case "ColorFormat": {
            const vizFormatter = new google.visualization.ColorFormat(formatter.options);
            const { ranges } = formatter;
            for (let range of ranges) {
              vizFormatter.addRange(...range);
            }
            vizFormatter.format(dataTable, formatter.column);
            break;
          }
          case "DateFormat": {
            const vizFormatter = new google.visualization.DateFormat(formatter.options);
            vizFormatter.format(dataTable, formatter.column);
            break;
          }
          case "NumberFormat": {
            const vizFormatter = new google.visualization.NumberFormat(formatter.options);
            vizFormatter.format(dataTable, formatter.column);
            break;
          }
          case "PatternFormat": {
            const vizFormatter = new google.visualization.PatternFormat(formatter.options);
            vizFormatter.format(dataTable, formatter.column);
            break;
          }
        }
      }
    };
    this.getColumnID = (dataTable, columnIndex) => {
      return dataTable.getColumnId(columnIndex) || dataTable.getColumnLabel(columnIndex);
    };
    this.draw = async (param) => {
      let { data, diffdata, rows, columns, options, legend_toggle, legendToggle, chartType, formatters, spreadSheetUrl, spreadSheetQueryParameters } = param;
      const { google, googleChartWrapper } = this.props;
      let dataTable;
      let chartDiff = null;
      if (diffdata) {
        const oldData = google.visualization.arrayToDataTable(diffdata.old);
        const newData = google.visualization.arrayToDataTable(diffdata.new);
        chartDiff = google.visualization[chartType].prototype.computeDiff(oldData, newData);
      }
      if (data !== null) {
        if (Array.isArray(data)) {
          dataTable = google.visualization.arrayToDataTable(data);
        } else {
          dataTable = new google.visualization.DataTable(data);
        }
      } else if (rows && columns) {
        dataTable = google.visualization.arrayToDataTable([
          columns,
          ...rows
        ]);
      } else if (spreadSheetUrl) {
        dataTable = await loadDataTableFromSpreadSheet(google, spreadSheetUrl, spreadSheetQueryParameters);
      } else {
        dataTable = google.visualization.arrayToDataTable([]);
      }
      const columnCount = dataTable.getNumberOfColumns();
      for (let i = 0; i < columnCount; i += 1) {
        const columnID = this.getColumnID(dataTable, i);
        if (this.state.hiddenColumns.includes(columnID)) {
          const previousColumnLabel = dataTable.getColumnLabel(i);
          const previousColumnID = dataTable.getColumnId(i);
          const previousColumnType = dataTable.getColumnType(i);
          dataTable.removeColumn(i);
          dataTable.addColumn({
            label: previousColumnLabel,
            id: previousColumnID,
            type: previousColumnType
          });
        }
      }
      const chart = googleChartWrapper.getChart();
      if (googleChartWrapper.getChartType() === "Timeline") {
        chart && chart.clearChart();
      }
      googleChartWrapper.setChartType(chartType);
      googleChartWrapper.setOptions(options || {});
      googleChartWrapper.setDataTable(dataTable);
      googleChartWrapper.draw();
      if (this.props.googleChartDashboard !== null) {
        this.props.googleChartDashboard.draw(dataTable);
      }
      if (chartDiff) {
        googleChartWrapper.setDataTable(chartDiff);
        googleChartWrapper.draw();
      }
      if (formatters) {
        this.applyFormatters(dataTable, formatters);
        googleChartWrapper.setDataTable(dataTable);
        googleChartWrapper.draw();
      }
      if (legendToggle === true || legend_toggle === true) {
        this.grayOutHiddenColumns({
          options
        });
      }
      return;
    };
    this.grayOutHiddenColumns = (param) => {
      let { options } = param;
      const { googleChartWrapper } = this.props;
      const dataTable = googleChartWrapper.getDataTable();
      if (!dataTable)
        return;
      const columnCount = dataTable.getNumberOfColumns();
      const hasAHiddenColumn = this.state.hiddenColumns.length > 0;
      if (hasAHiddenColumn === false)
        return;
      const colors = Array.from({
        length: columnCount - 1
      }).map((dontcare, i) => {
        const columnID = this.getColumnID(dataTable, i + 1);
        if (this.state.hiddenColumns.includes(columnID)) {
          return GRAY_COLOR;
        } else if (options && options.colors) {
          return options.colors[i];
        } else {
          return DEFAULT_CHART_COLORS[i];
        }
      });
      googleChartWrapper.setOptions({
        ...options,
        colors
      });
      googleChartWrapper.draw();
    };
    this.onResize = () => {
      const { googleChartWrapper } = this.props;
      googleChartWrapper.draw();
    };
  }
};
var GoogleChartDataTable = class extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { google, googleChartWrapper, googleChartDashboard } = this.props;
    return React.createElement(ContextConsumer, {
      render: (props) => {
        return React.createElement(GoogleChartDataTableInner, Object.assign({}, props, {
          google,
          googleChartWrapper,
          googleChartDashboard
        }));
      }
    });
  }
};
var GoogleChartEvents = class extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  listenToEvents(param) {
    let { chartEvents, google, googleChartWrapper } = param;
    if (!chartEvents) {
      return;
    }
    google.visualization.events.removeAllListeners(googleChartWrapper);
    for (let event of chartEvents) {
      var _this = this;
      const { eventName, callback } = event;
      google.visualization.events.addListener(googleChartWrapper, eventName, function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback({
          chartWrapper: googleChartWrapper,
          props: _this.props,
          google,
          eventArgs: args
        });
      });
    }
  }
  componentDidMount() {
    var ref;
    const { google, googleChartWrapper } = this.props;
    this.listenToEvents({
      chartEvents: ((ref = this.propsFromContext) === null || ref === void 0 ? void 0 : ref.chartEvents) || null,
      google,
      googleChartWrapper
    });
  }
  render() {
    this.props;
    return React.createElement(ContextConsumer, {
      render: (propsFromContext) => {
        this.propsFromContext = propsFromContext;
        return null;
      }
    });
  }
  constructor(props) {
    super(props);
    this.propsFromContext = null;
  }
};
var controlCounter = 0;
var GoogleChart = class extends React.Component {
  componentDidMount() {
    const { options, google, chartType, chartWrapperParams, toolbarItems, getChartEditor, getChartWrapper } = this.props;
    const chartConfig = {
      chartType,
      options,
      containerId: this.getGraphID(),
      ...chartWrapperParams
    };
    const googleChartWrapper = new google.visualization.ChartWrapper(chartConfig);
    googleChartWrapper.setOptions(options || {});
    if (getChartWrapper) {
      getChartWrapper(googleChartWrapper, google);
    }
    const googleChartDashboard = new google.visualization.Dashboard(this.dashboard_ref);
    const googleChartControls = this.addControls(googleChartWrapper, googleChartDashboard);
    if (toolbarItems) {
      google.visualization.drawToolbar(this.toolbar_ref.current, toolbarItems);
    }
    let googleChartEditor = null;
    if (getChartEditor) {
      googleChartEditor = new google.visualization.ChartEditor();
      getChartEditor({
        chartEditor: googleChartEditor,
        chartWrapper: googleChartWrapper,
        google
      });
    }
    this.setState({
      googleChartEditor,
      googleChartControls,
      googleChartDashboard,
      googleChartWrapper,
      isReady: true
    });
  }
  componentDidUpdate() {
    if (!this.state.googleChartWrapper)
      return;
    if (!this.state.googleChartDashboard)
      return;
    if (!this.state.googleChartControls)
      return;
    const { controls } = this.props;
    if (controls) {
      for (let i = 0; i < controls.length; i += 1) {
        const { controlType, options, controlWrapperParams } = controls[i];
        if (controlWrapperParams && "state" in controlWrapperParams) {
          this.state.googleChartControls[i].control.setState(controlWrapperParams["state"]);
        }
        this.state.googleChartControls[i].control.setOptions(options);
        this.state.googleChartControls[i].control.setControlType(controlType);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isReady !== nextState.isReady || nextProps.controls !== this.props.controls;
  }
  render() {
    const { width, height, options, style } = this.props;
    const divStyle = {
      height: height || options && options.height,
      width: width || options && options.width,
      ...style
    };
    if (this.props.render) {
      return React.createElement("div", {
        ref: this.dashboard_ref,
        style: divStyle
      }, React.createElement("div", {
        ref: this.toolbar_ref,
        id: "toolbar"
      }), this.props.render({
        renderChart: this.renderChart,
        renderControl: this.renderControl,
        renderToolbar: this.renderToolBar
      }));
    } else {
      return React.createElement("div", {
        ref: this.dashboard_ref,
        style: divStyle
      }, this.renderControl((param) => {
        let { controlProp } = param;
        return controlProp.controlPosition !== "bottom";
      }), this.renderChart(), this.renderControl((param) => {
        let { controlProp } = param;
        return controlProp.controlPosition === "bottom";
      }), this.renderToolBar());
    }
  }
  constructor(...args1) {
    var _this1;
    super(...args1), _this1 = this;
    this.state = {
      googleChartWrapper: null,
      googleChartDashboard: null,
      googleChartControls: null,
      googleChartEditor: null,
      isReady: false
    };
    this.graphID = null;
    this.dashboard_ref = React.createRef();
    this.toolbar_ref = React.createRef();
    this.getGraphID = () => {
      const { graphID, graph_id } = this.props;
      let instanceGraphID;
      if (!graphID && !graph_id) {
        if (!this.graphID) {
          instanceGraphID = generateUniqueID();
        } else {
          instanceGraphID = this.graphID;
        }
      } else if (graphID && !graph_id) {
        instanceGraphID = graphID;
      } else if (graph_id && !graphID) {
        instanceGraphID = graph_id;
      } else {
        instanceGraphID = graphID;
      }
      this.graphID = instanceGraphID;
      return this.graphID;
    };
    this.getControlID = (id, index) => {
      controlCounter += 1;
      let controlID;
      if (typeof id === "undefined") {
        controlID = "googlechart-control-".concat(index, "-").concat(controlCounter);
      } else {
        controlID = id;
      }
      return controlID;
    };
    this.addControls = (googleChartWrapper, googleChartDashboard) => {
      const { google, controls } = this.props;
      const googleChartControls = !controls ? null : controls.map((control, i) => {
        const { controlID: controlIDMaybe, controlType, options: controlOptions, controlWrapperParams } = control;
        const controlID = this.getControlID(controlIDMaybe, i);
        return {
          controlProp: control,
          control: new google.visualization.ControlWrapper({
            containerId: controlID,
            controlType,
            options: controlOptions,
            ...controlWrapperParams
          })
        };
      });
      if (!googleChartControls) {
        return null;
      }
      googleChartDashboard.bind(googleChartControls.map((param) => {
        let { control } = param;
        return control;
      }), googleChartWrapper);
      for (let chartControl of googleChartControls) {
        const { control, controlProp } = chartControl;
        const { controlEvents = [] } = controlProp;
        for (let event of controlEvents) {
          var _this = this;
          const { callback, eventName } = event;
          google.visualization.events.removeListener(control, eventName, callback);
          google.visualization.events.addListener(control, eventName, function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            callback({
              chartWrapper: googleChartWrapper,
              controlWrapper: control,
              props: _this.props,
              google,
              eventArgs: args
            });
          });
        }
      }
      return googleChartControls;
    };
    this.renderChart = () => {
      const { width, height, options, style, className, rootProps, google } = this.props;
      const divStyle = {
        height: height || options && options.height,
        width: width || options && options.width,
        ...style
      };
      return React.createElement("div", Object.assign({
        id: this.getGraphID(),
        style: divStyle,
        className
      }, rootProps), this.state.isReady && this.state.googleChartWrapper !== null ? React.createElement(React.Fragment, null, React.createElement(GoogleChartDataTable, {
        googleChartWrapper: this.state.googleChartWrapper,
        google,
        googleChartDashboard: this.state.googleChartDashboard
      }), React.createElement(GoogleChartEvents, {
        googleChartWrapper: this.state.googleChartWrapper,
        google
      })) : null);
    };
    this.renderControl = function() {
      let filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (param) => {
        return true;
      };
      return _this1.state.isReady && _this1.state.googleChartControls !== null ? React.createElement(React.Fragment, null, _this1.state.googleChartControls.filter((param) => {
        let { controlProp, control } = param;
        return filter({
          control,
          controlProp
        });
      }).map((param) => {
        let { control, controlProp } = param;
        return React.createElement("div", {
          key: control.getContainerId(),
          id: control.getContainerId()
        });
      })) : null;
    };
    this.renderToolBar = () => {
      if (!this.props.toolbarItems)
        return null;
      return React.createElement("div", {
        ref: this.toolbar_ref
      });
    };
  }
};
var Chart$1 = class extends React.Component {
  render() {
    const { chartLanguage, chartPackages, chartVersion, mapsApiKey, loader, errorElement } = this.props;
    return React.createElement(ContextProvider, {
      value: this.props
    }, this.state.loadingStatus === "ready" && this.state.google !== null ? React.createElement(GoogleChart, Object.assign({}, this.props, {
      google: this.state.google
    })) : this.state.loadingStatus === "errored" && errorElement ? errorElement : loader, React.createElement(LoadGoogleCharts, {
      chartLanguage,
      chartPackages,
      chartVersion,
      mapsApiKey,
      onLoad: this.onLoad,
      onError: this.onError
    }));
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  isFullyLoaded(google) {
    const { controls, toolbarItems, getChartEditor } = this.props;
    return google && google.visualization && google.visualization.ChartWrapper && google.visualization.Dashboard && (!controls || google.visualization.ChartWrapper) && (!getChartEditor || google.visualization.ChartEditor) && (!toolbarItems || google.visualization.drawToolbar);
  }
  constructor(...args) {
    super(...args);
    this._isMounted = false;
    this.state = {
      loadingStatus: "loading",
      google: null
    };
    this.onLoad = (google1) => {
      if (this.props.onLoad) {
        this.props.onLoad(google1);
      }
      if (this.isFullyLoaded(google1)) {
        this.onSuccess(google1);
      } else {
        const id = setInterval(() => {
          const google = window.google;
          if (this._isMounted) {
            if (google && this.isFullyLoaded(google)) {
              clearInterval(id);
              this.onSuccess(google);
            }
          } else {
            clearInterval(id);
          }
        }, 1e3);
      }
    };
    this.onSuccess = (google) => {
      this.setState({
        loadingStatus: "ready",
        google
      });
    };
    this.onError = () => {
      this.setState({
        loadingStatus: "errored"
      });
    };
  }
};
Chart$1.defaultProps = chartDefaultProps;
var GoogleDataTableColumnRoleType;
(function(GoogleDataTableColumnRoleType2) {
  GoogleDataTableColumnRoleType2["annotation"] = "annotation";
  GoogleDataTableColumnRoleType2["annotationText"] = "annotationText";
  GoogleDataTableColumnRoleType2["certainty"] = "certainty";
  GoogleDataTableColumnRoleType2["emphasis"] = "emphasis";
  GoogleDataTableColumnRoleType2["interval"] = "interval";
  GoogleDataTableColumnRoleType2["scope"] = "scope";
  GoogleDataTableColumnRoleType2["style"] = "style";
  GoogleDataTableColumnRoleType2["tooltip"] = "tooltip";
  GoogleDataTableColumnRoleType2["domain"] = "domain";
})(GoogleDataTableColumnRoleType || (GoogleDataTableColumnRoleType = {}));
var Chart = Chart$1;
export {
  Chart$1 as Chart,
  GoogleDataTableColumnRoleType,
  Chart as default
};
//# sourceMappingURL=react-google-charts.js.map
