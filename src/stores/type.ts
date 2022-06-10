export interface ChinaAdd {
	confirm: number;
	noInfect: number;
	localConfirm: number;
	heal: number;
	dead: number;
	nowConfirm: number;
	suspect: number;
	nowSevere: number;
	importedCase: number;
	noInfectH5: number;
	localConfirmH5: number;
}

export interface ShowAddSwitch {
	confirm: boolean;
	heal: boolean;
	nowSevere: boolean;
	noInfect: boolean;
	localConfirm: boolean;
	all: boolean;
	suspect: boolean;
	dead: boolean;
	nowConfirm: boolean;
	importedCase: boolean;
	localinfeciton: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	highRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
	showRate: boolean;
	heal: number;
	provinceLocalConfirm: number;
	nowConfirm: number;
	dead: number;
	mtime: string;
	adcode: string;
	confirm: number;
	showHeal: boolean;
	wzz: number;
	mediumRiskAreaNum: number;
}

export interface Today {
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
}

export interface Total {
	provinceLocalConfirm: number;
	adcode: string;
	confirm: number;
	wzz: number;
	highRiskAreaNum: number;
	continueDayZeroConfirm: number;
	dead: number;
	showHeal: boolean;
	continueDayZeroConfirmAdd: number;
	continueDayZeroLocalConfirmAdd: number;
	nowConfirm: number;
	showRate: boolean;
	mtime: string;
	heal: number;
	mediumRiskAreaNum: number;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: number;
	local_confirm_add: number;
}

export interface ChinaTotal {
	localConfirm:number;
	importedCase:number;
	noInfect:number;
	nowConfirm: number;
	confirm: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	showRate: boolean;
	heal: number;
	highRiskAreaNum: number;
	dead: number;
	wzz: number;
	continueDayZeroLocalConfirmAdd: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	mtime: string;
	adcode: string;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface Diseaseh5Shelf {
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
}

export interface LocalCityNCOVDataList {
	adcode: string;
	isUpdated: boolean;
	mtime: string;
	local_confirm_add: number;
	isSpecialCity: boolean;
	province: string;
	city: string;
	date: string;
	local_wzz_add: string;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	nowConfirm:	number;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	localCityNCOVDataList: LocalCityNCOVDataList[];
}
