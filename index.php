<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="game.js"></script>
<link rel="stylesheet" href="style.css" />

<body>
    <h2>Connect 4</h2>
    <h2 class="winner"></h2>
    <div class="container">
        <?php
            for($rowId = 0; $rowId < 6; $rowId++) {
        ?>
        <div class="board-row">
            <?php
                for($colId = 0; $colId < 7; $colId++) {
            ?>
                <div class="one-field"
                    attr-row-index="<?= $rowId ?>"
                    attr-col-index="<?= $colId ?>">
                </div>
            <?php
                }
            ?>
        </div>
        <?php
        }
        ?>
    </div>
</body>