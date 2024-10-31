namespace SpriteKind {
    export const cuccoon = SpriteKind.create()
    export const FlyingCreature = SpriteKind.create()
    export const END = SpriteKind.create()
    export const Coins = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    game.gameOver(true)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hero.vy == 0) {
        hero.vy += -160
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.cuccoon, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    Flying_Creature = sprites.create(assets.image`Flying Creature`, SpriteKind.FlyingCreature)
    Flying_Creature.setPosition(hero.x - 80, hero.y - 80)
    Flying_Creature.follow(hero)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.FlyingCreature, function (sprite, otherSprite) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coins, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
let Flying_Creature: Sprite = null
let cuccoon: Sprite = null
let coin: Sprite = null
let hero: Sprite = null
info.setScore(0)
game.setGameOverEffect(true, effects.confetti)
game.setGameOverEffect(false, effects.melt)
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`Level`)
hero = sprites.create(assets.image`SpaceShip`, SpriteKind.Player)
controller.moveSprite(hero, 100, 0)
hero.ay = 350
scene.cameraFollowSprite(hero)
hero.setPosition(54, 200)
for (let value of tiles.getTilesByType(assets.tile`coin spawn`)) {
    coin = sprites.create(assets.image`myImage`, SpriteKind.Coins)
    animation.runImageAnimation(
    coin,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b . . . . . . . 
        . . . . . b a a a b . . . . . . 
        . . . . b a a a d a b . . . . . 
        . . . . b a a d a a b . . . . . 
        . . . . b a a a a a b . . . . . 
        . . . . b a a a a a b . . . . . 
        . . . . b a a a a a b . . . . . 
        . . . . b a a a a a b . . . . . 
        . . . . b a a a a a b . . . . . 
        . . . . . b a a a b . . . . . . 
        . . . . . . b b b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . b a a a a b . . . . . 
        . . . . b a a a d d a b . . . . 
        . . . . b a a d a a a b . . . . 
        . . . . b a a a a a a b . . . . 
        . . . . b a a a a a a b . . . . 
        . . . . b a a a a a a b . . . . 
        . . . . b a a a a a a b . . . . 
        . . . . b a a a a a a b . . . . 
        . . . . b a a a a a a b . . . . 
        . . . . . b a a a a b . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    500,
    true
    )
    tiles.placeOnTile(coin, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
for (let value of tiles.getTilesByType(assets.tile`myTile1`)) {
    cuccoon = sprites.create(assets.image`Cuccoon`, SpriteKind.cuccoon)
    tiles.placeOnTile(cuccoon, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
game.onUpdate(function () {
    hero.setImage(assets.image`SpaceShip`)
    if (hero.vx < 0) {
        hero.image.flipX()
    }
    if (hero.vy < 0) {
        hero.setImage(assets.image`jump hero`)
    }
})
forever(function () {
    if (hero.y > 350) {
        game.gameOver(false)
    }
})
