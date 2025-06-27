import { ChangeEvent, Dispatch, ReactNode, SetStateAction, startTransition, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { graphql, useLazyLoadQuery, useRefetchableFragment } from "react-relay";
import { css } from "@emotion/react";

import { Dropdown, HelpTooltip, TooltipTrigger, TriggerWrap } from "@arizeai/components";
import {
  Button,
  ConnectedLastNTimeRangePicker,
  ErrorBoundary,
  Flex,
  ListBox,
  Loading,
  Popover,
  Select,
  SelectChevronUpDownIcon,
  SelectItem,
  SelectValue,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  TextErrorBoundaryFallback,
  View,
} from "@phoenix/components";
import { LatencyText } from "@phoenix/components/trace/LatencyText";
import { StreamStateProvider, useStreamState } from "@phoenix/contexts/StreamStateContext";
import { formatInt, intFormatter } from "@phoenix/utils/numberFormatUtils";

import { UsagePage_stats$key } from "./__generated__/UsagePage_stats.graphql";
import { UsagePageQuery } from "./__generated__/UsagePageQuery.graphql";
import { AnnotationSummary } from "./AnnotationSummary";
import { DocumentEvaluationSummary } from "./DocumentEvaluationSummary";
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip as BarTooltip,
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
} from "recharts";
import { useTimeRange } from "@phoenix/components/datetime";
import { ProjectPageHeader_stats$key } from "./__generated__/ProjectPageHeader_stats.graphql";
import { useParams } from "react-router";
import { useProjectStats } from "./ProjectPageHeader";
import { useProjectPageData } from "./ProjectPage";
import { count } from "console";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTracingContext } from "@phoenix/contexts/TracingContext";
import { Column } from "@tanstack/react-table";

export function Usage() {
  const { projectId } = useParams();
  const { timeRange } = useTimeRange();
  return(
    <Suspense fallback={<Loading />}>
        <UsagePageHeader
          projectId={projectId as string}
          timeRange={timeRange}
        />
    </Suspense>
  )
}


// Colors
const COLORS_CHATMODE = ["#1a6cf5", "#172b88", "#ffe066"];
const COLORS_LANGUAGE = ["#1a6cf5", "#172588", "#ffb580"];
const COLORS_RATING = ["#1a6cf5", "#172b88", "#ff4c4c"];

const renderPieLabel = ({ value, percent }: {value: number, percent: number}) => (percent > 0.04 ? `${value} (${(percent * 100).toFixed(2)}%)`: "");

const CustomPieTooltip = ({ active, payload, labelKey, valueKey}: {active?: any, payload?: any, labelKey: string, valueKey: string}) => {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    return (
      <div 
        style = {{
          background: "#fff",
          border: "1px solid #aaa",
          padding: "6px 12px",
          borderRadius: 6,
        }}
        >
          <b>{entry[labelKey]}</b>
          <br/>
          Value: {entry[valueKey]}
          <br/>
          {payload[0].percent !== undefined ? `Percent: ${(payload[0].percent * 100).toFixed(2)}%`: null}
        </div>
    );
  }

  return null;
};

const PieLegend = ({items}: {items: any}) => (
  <div style={{textAlign: "center", alignItems: "center", marginTop: 8, fontSize: 12}}>
    {items.map((item:any, i:number) => (
      <span key={item.label} style={{ color: item.color, marginRight: 8}}>
        <span style={{ fontSize: 16 }}>●</span>
        <span style={{color: "#222", marginLeft: 4}}>{item.label}</span>
        {i !== item.length - 1 && " "}
      </span>
    ))}
  </div>
);

 function DashboardCharts({
  usageBySellersData,
  sellersByWorkRegionData,
  conversationsByChatModeData,
  conversationsByLanguageData,
  responseRatingByUsersData,
  departmentList,
  departments,
  setDepartments
}: {
  usageBySellersData: any;
  sellersByWorkRegionData: any;
  conversationsByChatModeData: any;
  conversationsByLanguageData: any;
  responseRatingByUsersData: any;
  departmentList: string[];
  departments: string[];
  setDepartments: (value: string[]) => void;
}) {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "Inter, sans-serif",
        padding: "0 0",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 0, // No horizontal gap
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          // maxWidth: 1200,0
          margin: "0 auto",
        }}
      >
        {/* First Column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, minWidth: 330 }}>
          {/* Bar Chart 1 */}
          <div style={{ width: 500, marginBottom: 24 }}>
            <div
              style={{
                fontWeight: 500,
                fontSize: 16,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Usage by Sellers
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={usageBySellersData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 35 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  domain={[0, 10]}
                  label={{
                    value: "User Count",
                    position: "insideBottom",
                    offset: -15,
                    fontSize: 14,
                  }}
                  tick={{ fontSize: 12 }}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="type"
                  width={150}
                  label={{
                    value: "Seller Type",
                    angle: -90,
                    position: "insideLeft",
                    offset: 12,
                    fontSize: 14,
                  }}
                  tick={{ fontSize: 12 }}
                />
                <BarTooltip />
                <Bar dataKey="count" fill="#118DFF" barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Donut Chart 1 */}
          <div style={{ width: 500 }}>
            <div
              style={{
                fontWeight: 500,
                fontSize: 16,
                textAlign: "center",
                paddingBottom: 10,
              }}
            >
              Conversations by Chat Mode
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={conversationsByChatModeData}
                  dataKey="rate"
                  nameKey="mode"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={90}
                  label={renderPieLabel}
                  labelLine={false}
                  startAngle={90}
                  endAngle={450}
                  isAnimationActive={false}
                >
                  {conversationsByChatModeData.map((entry: string, idx:number) => (
                    <Cell key={`cell-${idx}`} fill={COLORS_CHATMODE[idx]} />
                  ))}
                </Pie>
                <PieTooltip
                  content={props =>
                    CustomPieTooltip({
                      ...props,
                      labelKey: "mode",
                      valueKey: "rate",
                    })
                  }
                />
              </PieChart>
            </ResponsiveContainer>
            <PieLegend
              items={[
                { color: "#1a6cf5", label: "Compass - External" },
                { color: "#172b88", label: "Compass - Internal" },
                { color: "#ffe066", label: "Secure ChatGPT" },
              ]}
            />
          </div>
        </div>
        {/* Second Column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, minWidth: 330 }}>
          {/* Bar Chart 2 */}
          <div style={{ width: 500, marginBottom: 24 }}>
            <div
              style={{
                fontWeight: 500,
                fontSize: 16,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Sellers by Work Region
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={sellersByWorkRegionData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 35 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  domain={[0, 10]}
                  label={{
                    value: "User Count",
                    position: "insideBottom",
                    offset: -15,
                    fontSize: 14,
                  }}
                  tick={{ fontSize: 12 }}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="region"
                  width={110}
                  label={{
                    value: "Work Region",
                    angle: -90,
                    position: "insideLeft",
                    offset: 8,
                    fontSize: 14,
                  }}
                  tick={{ fontSize: 12 }}
                />
                <BarTooltip />
                <Bar dataKey="count" fill="#118DFF" barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Donut Chart 2 */}
          <div style={{ width: 500 }}>
            <div
              style={{
                fontWeight: 500,
                fontSize: 16,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Conversations by Language
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={conversationsByLanguageData}
                  dataKey="rate"
                  nameKey="language"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={90}
                  label={renderPieLabel}
                  labelLine={false}
                  startAngle={90}
                  endAngle={450}
                  isAnimationActive={false}
                >
                  {conversationsByLanguageData.map((entry: string, idx:number) => (
                    <Cell key={`cell-${idx}`} fill={COLORS_LANGUAGE[idx]} />
                  ))}
                </Pie>
                <PieTooltip
                  content={props =>
                    CustomPieTooltip({
                      ...props,
                      labelKey: "language",
                      valueKey: "rate",
                    })
                  }
                />
              </PieChart>
            </ResponsiveContainer>
            <PieLegend
              items={[
                { color: "#1a6cf5", label: "English" },
                { color: "#172b88", label: "Spanish" },
                { color: "#ffb580", label: "Portuguese" },
              ]}
            />
          </div>
        </div>
        {/* Third Column */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, minWidth: 330 }}>
          <div style={{ height: 302 }} > {/* Filler for alignment */}
              <Dropdown
                  menu={<ColumnSelectorMenu columns={departmentList} onChange={setDepartments} departments={departments} />}
                  triggerProps={{
                    placement: "bottom end",
                    shouldFlip: false
                  }}
                >
                  <Flex direction="row" alignItems="center" gap="size-100">
                    {departments.length === 1 ? departments[0] : departments.length === 0 ? "Departments" : "Multiple selections"}
                  </Flex>
                </Dropdown>
          </div>
          <div style={{ width: 500 }}>
            <div
              style={{
                fontWeight: 500,
                fontSize: 16,
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              Response Rating by Users
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={responseRatingByUsersData}
                  dataKey="rate"
                  nameKey="user"
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={90}
                  label={renderPieLabel}
                  labelLine={false}
                  startAngle={90}
                  endAngle={450}
                  isAnimationActive={false}
                >
                  {responseRatingByUsersData.map((entry: string, idx: number) => (
                    <Cell key={`cell-${idx}`} fill={COLORS_RATING[idx]} />
                  ))}
                </Pie>
                <PieTooltip
                  content={props =>
                    CustomPieTooltip({
                      ...props,
                      labelKey: "user",
                      valueKey: "rate",
                    })
                  }
                />
              </PieChart>
            </ResponsiveContainer>
            <PieLegend
              items={[
                { color: "#1a6cf5", label: "Not Given" },
                { color: "#172b88", label: "Approved" },
                { color: "#ff4c4c", label: "Disapproved" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function UsagePage(props: {
  project: ProjectPageHeader_stats$key;
}) {

  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);

  const [data, refetch] = useProjectStats(props.project, departments);

  useEffect(() => {
    startTransition(() => {
      refetch({ departments }, { fetchPolicy: "store-and-network" });
    });
  }, [refetch, departments]);

  useEffect(() => {
    console.log(">>>>>> Selected Departments", departments);
  }, [departments])

  const {
    userCount,
    countOfConversation,
    messageCount,
    avgMonthlyActiveUsers,
    avgDailyActiveUsers,
    avgMessagesPerConversation,
    monthlyActiveUsers,
    messagesOverMonths,
    usageBySellers,
    sellersByWorkRegion,
    conversationsByChatMode,
    conversationsByLanguage,
    responseRatingByUsers,
    departmentList,
  } = data;

  console.log('de', departmentList)

  return (
    <PerfectScrollbar>
      <View paddingStart="size-200" paddingEnd="size-200" paddingTop="size-100" paddingBottom="size-50" flex="none">
        <div style={{
          position: 'absolute',
          top: '48px',
          right: '10px'
        }}>
          <ConnectedLastNTimeRangePicker />
        </div>
        <Tabs>
          <TabList>
            <Tab id="overview">Overview</Tab>
            <Tab id="conversations">Conversations</Tab>
          </TabList>
          <TabPanel id="overview">
            <View paddingStart="size-200" paddingEnd="size-200" paddingTop="size-600" paddingBottom="size-50" flex="none">
              <Flex direction="column" justifyContent="space-evenly" alignItems="center" gap="size-1000">
                {/* Top Metrics */}
                <Flex direction="row" gap="size-400" alignItems="center" marginBottom={10}>
                  <MetricBlock label="User Count" value={userCount} />
                  <MetricBlock label="Count of Conversation" value={countOfConversation} />
                  <MetricBlock label="Message Count" value={messageCount} />
                  <MetricBlock label="Avg Monthly Active Users" value={avgMonthlyActiveUsers} />
                  <MetricBlock label="Avg Daily Active Users" value={avgDailyActiveUsers} />
                  <MetricBlock label="Avg Messages per Conversation" value={avgMessagesPerConversation} />
                </Flex>

                {/* Line Charts */}
                <Flex direction="row" alignItems="center">
                  <Flex direction="column" alignItems="center">

                      <Text>Monthly Active Users</Text>

                      <Flex direction="row" alignItems="center">
                        <Text
                          css={css`
                            writing-mode: sideways-lr;
                            text-orientation: mixed;                    
                            white-space: nowrap;
                          `}
                        >
                          User Count
                        </Text>
                        <LineChart width={600} height={400} data={monthlyActiveUsers}>
                          <XAxis dataKey="timestamp" padding={{ left: 30, right: 30 }} />
                          <YAxis />
                          <Tooltip />
                          {/* <Legend /> */}
                          {/* <CartesianGrid stroke="#eee" strokeDasharray="3 3" /> */}
                          <Line type="linear" dataKey="value" stroke="#82ca9d" />
                        </LineChart>
                      </Flex>
                  </Flex>
                  
                  <Flex direction="column" alignItems="center">
                    <Text>Message Over Months</Text>
                    
                    <Flex direction="row" alignItems="center">
                      <Text
                          css={css`
                            writing-mode: sideways-lr;
                            text-orientation: mixed;                    
                            white-space: nowrap;
                          `}
                        >
                          Message Count
                        </Text>
                    <LineChart width={600} height={400} data={messagesOverMonths}>
                      <XAxis dataKey="timestamp" padding={{ left: 30, right: 30 }} />
                      <YAxis />
                      <Tooltip />
                      {/* <Legend /> */}
                      {/* <CartesianGrid stroke="#eee" strokeDasharray="3 3" /> */}
                      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                    </LineChart>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </View>
          </TabPanel>
          <TabPanel id="conversations">
            <View paddingStart="size-200" paddingEnd="size-200" paddingTop="size-600" paddingBottom="size-50" flex="none">
              <Flex direction="row" alignItems="center">
                {/* <Dropdown
                  menu={<ColumnSelectorMenu columns={departmentList} onChange={setDepartments} departments={departments} />}
                  triggerProps={{
                    placement: "bottom end",
                    shouldFlip: false
                  }}
                >
                  <Flex direction="row" alignItems="center" gap="size-100">
                    {departments.length === 1 ? departments[0] : departments.length === 0 ? "Departments" : "Multiple selections"}
                  </Flex>
                </Dropdown> */}
                <DashboardCharts usageBySellersData = {usageBySellers} sellersByWorkRegionData={sellersByWorkRegion} 
                  conversationsByChatModeData={conversationsByChatMode} conversationsByLanguageData={conversationsByLanguage}
                  responseRatingByUsersData={responseRatingByUsers}   departmentList={departmentList}
  departments={departments}
  setDepartments={setDepartments}/>
              </Flex>
            </View>
          </TabPanel>
        </Tabs>
        
      </View>
    </PerfectScrollbar>
  );
}

export function UsagePageHeader({
  projectId,
  timeRange,
}: {
  projectId: string;
  timeRange: OpenTimeRange;
}) {

  const timeRangeVariable = useMemo(() => {
    return {
      start: timeRange?.start?.toISOString(),
      end: timeRange?.end?.toISOString(),
    };
  }, [timeRange]);

  const data = useProjectPageData(projectId, timeRange);
  
  return (
    <StreamStateProvider>
      <UsagePage
        project={data.project}
      />
    </StreamStateProvider>)
}

// Simple metric display
function MetricBlock({ label, value }: { label: string; value: number }) {
  return (
    <Flex direction="column" flex="none" alignItems="center">
      <Text elementType="h2" size="XL">{intFormatter(value)}</Text>
      <Text css={css`text-align: center;`} size="XS" color="text-700" maxWidth={150}>{label}</Text>
    </Flex>
  );
}

const columCheckboxItemCSS = css`
  padding: var(--ac-global-dimension-static-size-50)
    var(--ac-global-dimension-static-size-100);
  label {
    display: flex;
    align-items: center;
    gap: var(--ac-global-dimension-static-size-100);
  }
`;

function ColumnSelectorMenu({columns, departments, onChange}: {columns: readonly string[], departments: string[], onChange: Dispatch<SetStateAction<string[]>>;}): React.ReactNode {
  return (
    <div
      css={css`
        overflow-y: auto;
        max-height: calc(100vh - 200px);
      `}
    >
      <View paddingTop="size-50" paddingBottom="size-50">
        <ul>
          {columns.map((column, id) => {
            return (
              <li key={id} css={columCheckboxItemCSS}>
                <label>
                  <input
                    type="checkbox"
                    name={column}
                    checked={departments.includes(column)}
                    onChange={(e) => {
                      onChange(departments.includes(column) ? departments.filter(department => department != column) : [...departments, column])
                    }}
                  />
                  {column}
                </label>
              </li>
            );
          })}
        </ul>
      </View>
    </div>
  );
}