$(function() {
    let form = layui.form
    let layer = layui.layer
    $('.goreg').click(function() {
        $('.login').hide()
        $('.reg').show()
    })
    $('.gologin').click(function() {
        $('.login').show()
        $('.reg').hide()
    })
    form.verify({
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repassword: function(value) {
            if (value !== $('.reg .password').val()) return '两次密码不一致'
        }
    })
    $('.login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('.login').serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败！')
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })

    $('.reg').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $('.reg').serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败！')
                layer.msg('注册成功！')
                $('.login').show()
                $('.reg').hide()

            }
        })
    })




})