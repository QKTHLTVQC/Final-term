// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// BBCode tags example
// http://en.wikipedia.org/wiki/Bbcode
// ----------------------------------------------------------------------------
// Feel free to add more tags
// ----------------------------------------------------------------------------
mySettings = {
    onTab: { keepDefault: false, replaceWith: '\t' },
	previewParserPath:	'', // path to your BBCode parser
	markupSet: [
		{name:'In đậm', className:"bold", key:'B', openWith:'[b]', closeWith:'[/b]'},
		{name:'In nghiêng', className:"italic", key:'I', openWith:'[i]', closeWith:'[/i]'},
		{name:'Gạch chân', className:"underline", key:'U', openWith:'[u]', closeWith:'[/u]'},
		//{separator:'---------------' },
		//{name:'Bulleted list', className:"list", openWith:'[list]\n', closeWith:'\n[/list]'},
		//{name:'List item', className:"list-item", openWith:'[*] '},
		{separator:'---------------' },
		{name:'Chèn hình', className:"picture", key:'P', replaceWith:'[img][![Url]!][/img]'},
		{ name: 'Chèn liên kết', className: "link", key: 'L', openWith: '[url][![Url]!]', closeWith: '[/url]' },
		{separator:'---------------' },
		{name:'Youtube', className:"video", key:'M', openWith:'[youtube][![Url]!]', closeWith:'[/youtube]'}
		//{name:'Youtube', className:"video", key:'M', openWith:'[youtube][![Url]!]', closeWith:'[/youtube]'},
		//{name:'NhacCuaTui', className:"music", key:'T', openWith:'[nct][![Url]!]', closeWith:'[/nct]'},
		//{separator:'---------------' },
		//{name:'Quotes', className:"quote", openWith:'[quote]', closeWith:'[/quote]'},
		//{name:'Code', className:"code", openWith:'[code]', closeWith:'[/code]'}, 
		//{separator:'---------------' },
		//{name:'Clean', className:"clean", replaceWith:function(markitup) { return markitup.selection.replace(/\[(.*?)\]/g, "") } }
	]
}
