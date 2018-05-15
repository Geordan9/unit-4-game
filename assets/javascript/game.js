const Ragna = {
    "name": "Ragna",
    "imageURL": "assets/images/character_1.png",
    "health": 100,
    "attackPower": 8,
    "counterAttackPower": 12
}

const Azrael = {
    "name": "Azrael",
    "imageURL": "assets/images/character_2.png",
    "health": 150,
    "attackPower": 12,
    "counterAttackPower": 4
}

const Yu = {
    "name": "Yu",
    "imageURL": "assets/images/character_3.png",
    "health": 100,
    "attackPower": 10,
    "counterAttackPower": 10
}

const Ruby = {
    "name": "Ruby",
    "imageURL": "assets/images/character_4.png",
    "health": 120,
    "attackPower": 12,
    "counterAttackPower": 8
}

var characters = [Ragna, Azrael, Yu, Ruby];

var chosenCharacterAttackPower = 0;

$(document).ready(function () {
    function getRowOfCharacters() {
        var newRow = $("<div>").addClass("row");
        var index = 0;
        for (character of characters) {
            var newCharacterBox = $("<div>").addClass("characterBox col-md-2");
            newCharacterBox.attr("id", character.name)
            newCharacterBox.append($("<div>").text(character.name));
            var newImage = $("<img>");
            newImage.attr("src", character.imageURL);
            newImage.attr("alt", character.name);
            newCharacterBox.append(newImage);
            newCharacterBox.append($("<div>").attr("id", "health").text(`Health: ${character.health}`));
            newCharacterBox.attr("value", index);
            index++;
            newRow.append(newCharacterBox);
        }
        return newRow;
    }

    function getCharacter(characterBoxID) {
        for (character of characters) {
            if (character.name == characterBoxID) {
                return character;
            }
        }
    }

    function createRestartButton() {
        $("#fightDialog").append($("<button>").text("Restart").on("click", function () {
            location.reload();
        }));
    }

    $("#characters").append(getRowOfCharacters());

    $("#characters").on("click", ".characterBox", function () {
        $(this).appendTo("#chosenCharacter > div");

        chosenCharacterAttackPower = getCharacter($(this).attr("id")).attackPower;
        console.log(chosenCharacterAttackPower);

        for (character of characters) {
            if (character.name != $(this).attr("id")) {
                $(`#${character.name}`).appendTo("#availableEnemies > div");
            }
        }
    });

    $("#availableEnemies").on("click", ".row > div", function () {
        if ($("#defender > div").children().length <= 0) {
            $(this).appendTo("#defender > div");
        }

    });

    $("#attackButton").on("click", function () {
        if ($("#defender > div").children().length > 0) {
            var chosenCharacter = getCharacter($("#chosenCharacter > div > .characterBox").attr("id"));
            var defenderCharacter = getCharacter($("#defender > div > .characterBox").attr("id"));

            $("#fightDialog").text(
                `You attacked ${defenderCharacter.name} for ${chosenCharacter.attackPower} damage.` +
                "\n" +
                `${defenderCharacter.name} attacked you back for ${defenderCharacter.counterAttackPower} damage.`
            )

            defenderCharacter.health -= chosenCharacter.attackPower;
            chosenCharacter.health -= defenderCharacter.counterAttackPower;

            $("#chosenCharacter > div > .characterBox > #health").text(`Health: ${chosenCharacter.health}`);
            $("#defender > div > .characterBox > #health").text(`Health: ${defenderCharacter.health}`);

            chosenCharacter.attackPower += chosenCharacterAttackPower;

            if (defenderCharacter.health <= 0) {
                $("#fightDialog").text(`You have defeated ${defenderCharacter.name}, you can now pick another enemy.`);
                $("#defender > div > .characterBox").remove();
                if ($("#availableEnemies > div").children().length <= 0) {
                    $("#fightDialog").append($("<div>").text(`You beat every enemy! Hit "Restart" if you want to play again.`));
                    createRestartButton();
                }
            }
            if (chosenCharacter.health <= 0) {
                $("#fightDialog").append($("<div>").text('You lost. Hit "Restart" to try again.'));
                createRestartButton();
            }
        }

    });
});