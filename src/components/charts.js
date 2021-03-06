

import React, { Component } from 'react';
import {G2, Chart, Geom, Axis, Tooltip} from "bizcharts";
import { Layout, Menu, Breadcrumb,  Icon} from 'antd';
const { Header, Content, Footer} = Layout;
// 数据源
var addjson = [];
const SubMenu = Menu.SubMenu;
const webBase = 'https://www.mooooon333.cn:5000';
//const webBase = '';
class Charts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            genresNumber: [],
            countryNumber:[],
            languageNumber:[],
        }
    }
    handleJson() {
        for(let tmp of addjson) {
            //console.log(tmp);
            for(let tmpIn in tmp) {
                try {
                    tmp[tmpIn] = JSON.parse(tmp[tmpIn]);
                } catch(e) {
                    //console.log("出错"+tmpIn+e);
                }
                //tmp[tmpIn] = tmp[tmpIn].substring(0,tmp[tmpIn].length);
                //console.log(tmp[tmpIn]);
            }
        }
    }
    componentWillMount() {
        fetch(webBase+"/api/genre/all")
            .then(res => res.json())
            .then(json => {
                //console.log(json);
                addjson = json;
                //console.log(addjson);
                this.handleJson();
                this.setState({
                    data: addjson,
                    genresNumber:this.genreAnalyze(addjson),
                });
            });
        fetch(webBase+"/api/country/all")
            .then(res => res.json())
            .then(json => {
                console.log(json);
                addjson = json;
                //console.log(addjson);
                this.handleJson();
                this.setState({
                    data: addjson,
                    countryNumber:this.countryAnalyze(addjson),
                });
            });
        fetch(webBase+"/api/language/all")
            .then(res => res.json())
            .then(json => {
                console.log(json);
                addjson = json;
                //console.log(addjson);
                this.handleJson();
                this.setState({
                    data: addjson,
                    languageNumber:this.languageAnalyze(addjson),
                });
            });
    }
    genreAnalyze(addjson) {
        let analysis=[{genre:"剧情",movieNumber:0}];
        for(let eachitem of addjson) {
            let isexist = false;
            for(let eachgen of eachitem.genres) {
                for (let eachana of analysis) {
                    if (eachana.genre === eachgen) {
                        eachana.movieNumber++;
                        isexist = true;
                    }
                }
                if(!isexist){
                    analysis.push({genre:eachgen,movieNumber:1})
                }
            }
        }
        return analysis;
    }
    countryAnalyze(addjson){
        let analysis=[{country:"美国",movieNumber:0}];
        for(let eachitem of addjson) {
            let isexist = false;
            for(let each of eachitem.countries) {
                for (let eachana of analysis) {
                    if (eachana.country === each) {
                        eachana.movieNumber++;
                        isexist = true;
                    }
                }
                if(!isexist){
                    analysis.push({country:each,movieNumber:1})
                }
            }
        }
        return analysis;
    }
    languageAnalyze(addjson){
        let analysis=[{language:"英语",movieNumber:0}];
        for(let eachitem of addjson) {
            let isexist = false;
            for(let each of eachitem.languages) {
                for (let eachana of analysis) {
                    if (eachana.language === each) {
                        eachana.movieNumber++;
                        isexist = true;
                    }
                }
                if(!isexist){
                    analysis.push({language:each,movieNumber:1})
                }
            }
        }

        return analysis;
    }

    render() {
        const gerecols = {
            movieNumber: {
                tickInterval: 200
            }
        };
        const countrycols = {
            movieNumber: {
                tickInterval: 200
            }
        };
        const languagecols = {
            movieNumber: {
                tickInterval: 200
            }
        };
        const label = {
            rotate: 70,
            textStyle: {
                textAlign: 'center', // 文本对齐方向，可取值为： start center end
                fill: '#404040', // 文本的颜色
                fontSize: '10', // 文本大小
                fontWeight: 'bold', // 文本粗细
                textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle

            }
        }

        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><a href={`./`}  > <Icon type="bars" />电影列表</a></Menu.Item>
                        <Menu.Item key="2"><a href={`./#/charts`}  > <Icon type="bar-chart" />数据可视化</a></Menu.Item>

                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>charts</Breadcrumb.Item>
                    </Breadcrumb>
                    <h3>加载时间较长请耐心等待,鼠标移到对应列上可看清详细名称和数量</h3>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Chart height={400} data={this.state.genresNumber} scale={gerecols} forceFit>
                            <Axis name="genre" />
                            <Axis name="movieNumber" />

                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="interval" position="genre*movieNumber" color="genre" />
                        </Chart>
                        <Chart height={400} data={this.state.countryNumber} scale={countrycols} forceFit>
                            <Axis name="country"  label = {label}/>
                            <Axis name="movieNumber" />

                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="interval" position="country*movieNumber" color="country" />
                        </Chart>
                        <Chart height={400} data={this.state.languageNumber} scale={languagecols} forceFit>
                            <Axis name="language" label = {label}/>
                            <Axis name="movieNumber" />

                            <Tooltip
                                crosshairs={{
                                    type: "y"
                                }}
                            />
                            <Geom type="interval" position="language*movieNumber" color="language" />
                        </Chart>
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    同济大学软件学院Web课lab03 ©2018 Created by 白皓月
                </Footer>
            </Layout>)
    }
}
export default Charts


