<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Bookstore</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header>
        <h1>Welcome to the Online Bookstore</h1>
        <nav>
            <a href="index.php">Home</a>
            <a href="cart.html">Cart</a>
        </nav>
    </header>

    <main>
        <div class="book-list">
            <?php
                $books_json = file_get_contents('data/books.json');
                $books = json_decode($books_json, true);

                if ($books) {
                    foreach ($books as $book) {
                        echo '<div class="book">';
                        echo '<img src="' . htmlspecialchars($book['image']) . '" alt="' . htmlspecialchars($book['title']) . '">';
                        echo '<h2>' . htmlspecialchars($book['title']) . '</h2>';
                        echo '<p>By ' . htmlspecialchars($book['author']) . '</p>';
                        echo '<p>Price: $' . number_format($book['price'], 2) . '</p>';
                        echo '<button class="add-to-cart-btn" data-id="' . $book['id'] . '" data-title="' . htmlspecialchars($book['title']) . '" data-price="' . $book['price'] . '">Add to Cart</button>';
                        echo '</div>';
                    }
                } else {
                    echo '<p>No books found.</p>';
                }
            ?>
        </div>
    </main>

    <footer>
        <p>&copy; 2025 Online Bookstore</p>
    </footer>

    <script src="js/app.js"></script>
</body>
</html>
