$(function() {
	$.ajaxSetup({
		beforeSend: function(xhr) {
			var token = window.localStorage.getItem('token');
			if(token != '' && token != null) {
				xhr.setRequestHeader('token', token);
			}
		},
		complete: function(xhr) {
			if(xhr.responseJSON != null) {
				if(xhr.responseJSON.code === -1 && xhr.responseJSON.msg === '没有此操作权限') {
					window.location.href = "login.html";
				};
			}
		}
	});
})

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for(var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
}

function checkRequired(param) {
	for(var key in param) {
		if($('#' + key).hasClass('Required') && $('#' + key).val().trim() == '') {
			$('#checkForm').show();
			return;
		} else {
			$('#checkForm').hide();
		}
	}
}

function propSuccess(res, callback) {
	layer.msg(res.msg, {
		offset: 'rb',
		icon: 1,
		area: ['270px', '70px'],
		time: 3000
	}, callback)
}

function propFail(res, callback) {
	layer.msg(res.msg, {
		offset: 'rb',
		icon: 2,
		area: ['270px', '70px'],
		time: 3000
	}, callback)
}

function propWarn(text,callback){
		layer.msg(text,{
		offset: 'rb',
		icon: 3,
		area: ['270px', '70px'],
		time: 3000
	}, callback)
}

function propFailText(text, callback) {
	layer.msg(text, {
		offset: 'rb',
		icon: 2,
		area: ['270px', '70px'],
		time: 3000
	}, callback)
}

function fileUploadPictureInit(ctrlName, uploadUrl) {
	var control = $('#' + ctrlName);
	control.fileinput({
		language: 'zh',
		uploadUrl: uploadUrl,
		enctype: 'multipart/form-data',
		allowedFileExtensions: ['jpg', 'png', 'bmp', 'jpeg'], //接收的文件后缀
		showUpload: false, //是否显示上传按钮
		showPreview: true, //展前预览
		showRemove: true,
		showCaption: false, //是否显示标题
		maxFileSize: 3072, //上传文件最大的尺寸kb 3m
		dropZoneEnabled: true, //是否显示拖拽区域
		browseClass: "btn btn-primary", //按钮样式
		allowedFileTypes: ['image'],
		uploadAsync: true, //默认异步上传
	}).on('fileuoloaded', function(event, data, previewId, index) {
		//		control.attr("fileName", data.data.fileName);
		//		control.attr("filePath", data.data.filePath);
		//		control.attr("fileAddr", data.data.fileAddr);
	}).on('filebatchuploadsuccess', function(event, data, previewId, index) { //同步上传回调
		count--;
		control.attr("fileName", data.response.data.fileName);
		control.attr("filePath", data.response.data.filePath);
		control.attr("fileAddr", data.response.data.fileAddr);
	});
}

function fileUploadInit(ctrlName, uploadUrl) {
	var control = $('#' + ctrlName);
	control.fileinput({
		language: 'zh',
		uploadUrl: uploadUrl,
		enctype: 'multipart/form-data',
		showUpload: false, //是否显示上传按钮
		showPreview: true, //展前预览
		showRemove: true,
		showCaption: false, //是否显示标题
		maxFileSize: 30720, //上传文件最大的尺寸kb 30m
		dropZoneEnabled: true, //是否显示拖拽区域
		browseClass: "btn btn-primary", //按钮样式
		uploadAsync: true, //默认异步上传
	}).on('fileuoloaded', function(event, data, previewId, index) {
		//		control.attr("fileName", data.data.fileName);
		//		control.attr("filePath", data.data.filePath);
		//		control.attr("fileAddr", data.data.fileAddr);
	}).on('filebatchuploadsuccess', function(event, data, previewId, index) { //同步上传回调
		count--;
		control.attr("fileName", data.response.data.fileName);
		control.attr("filePath", data.response.data.filePath);
		control.attr("fileAddr", data.response.data.fileAddr);
	});
}