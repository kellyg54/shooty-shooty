sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 100)
    info.changeLifeBy(1)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.fire, 100)
    info.changeLifeBy(1)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . 6 6 . . . . . . 
5 4 2 . . . . . . 7 6 7 . . . . 
. 5 4 2 7 6 7 6 7 6 6 6 7 5 . . 
5 4 5 2 6 7 6 7 6 6 6 6 5 5 5 5 
. 5 4 2 7 6 7 6 7 6 6 6 7 5 . . 
5 4 2 . . . . . . 7 6 7 . . . . 
. . . . . . . . 6 6 . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, spacePlane, 200, 0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fountain, 500)
    info.changeLifeBy(-1)
})
let bogey: Sprite = null
let star: Sprite = null
let projectile: Sprite = null
let spacePlane: Sprite = null
game.splash("Shoot the oncoming spaceships with A button (or space bar)!Collect stars for extra lives and points")
effects.starField.startScreenEffect()
spacePlane = sprites.create(img`
. 8 8 3 8 . . . . . . . . . . . 
. . 8 8 3 8 8 . . . . . . . . . 
. . . 8 8 3 8 8 . . . . . . . . 
. . . 8 8 8 3 8 8 . . . . . . . 
. . . . 9 3 9 3 8 9 3 . . . . . 
. 4 . . 3 9 3 8 3 8 9 1 1 . . . 
5 2 . 3 9 8 3 3 8 3 a 9 1 1 . . 
2 4 8 9 3 9 3 8 3 8 9 a a a 8 . 
5 2 8 3 9 3 8 3 8 3 8 3 3 3 a 8 
2 4 8 9 3 8 3 8 3 8 3 3 3 a 8 8 
5 2 . 3 9 3 8 3 8 8 a a a 8 8 . 
. 4 . . 3 8 9 3 8 a 8 8 8 8 . . 
. . . . 8 3 8 8 8 8 8 . . . . . 
. . . 8 3 8 8 8 . . . . . . . . 
. . 8 3 8 8 8 . . . . . . . . . 
. 8 3 8 8 . . . . . . . . . . . 
`, SpriteKind.Player)
spacePlane.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(3)
info.setScore(0)
controller.moveSprite(spacePlane, 200, 200)
game.onUpdateInterval(2000, function () {
    star = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . 5 . . . . . . . 
. . . 5 1 . . 5 1 . . 4 5 . . . 
. . . 4 5 1 . 1 5 . 4 5 1 . . . 
. . . . 4 5 1 5 1 4 5 1 . . . . 
. . . . . 4 5 1 4 5 1 . . . . . 
. . 5 1 5 1 4 5 1 5 5 1 5 . . . 
. . . 5 1 5 1 4 5 1 1 5 1 5 . . 
. . . . . 1 5 5 4 5 4 . . . . . 
. . . . 1 5 4 5 5 1 5 4 . . . . 
. . . 1 5 4 . 5 1 . 1 5 4 . . . 
. . . 5 4 . . 1 5 . . 1 5 . . . 
. . . . . . . 5 . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Food)
    star.setVelocity(-50, 0)
    star.setPosition(180, Math.randomRange(8, 112))
})
game.onUpdateInterval(500, function () {
    bogey = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . a c a c . . . . . 
. . . . . . a c a c . . . . . . 
. . . . . a c a c . . . . . . . 
. . 9 a a c a c a . . . . . . 5 
. 9 9 a c a c a a a c a . . 5 4 
9 9 9 c a c a a a c a c a 2 4 5 
a c c a c a a a a a c a c 4 5 4 
. a a c a c a a a c a c a 2 4 5 
. . . a c a c a a a c . . . 5 4 
. . . . a c a c a . . . . . . 5 
. . . . . a c a c . . . . . . . 
. . . . . . . c a c . . . . . . 
. . . . . . . . c a c . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.setPosition(180, Math.randomRange(8, 112))
})
