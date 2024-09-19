#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < width; col++)
				{
            int avg = (int) round((float) (image[row][col].rgbtBlue + image[row][col].rgbtGreen + image[row][col].rgbtRed) / 3);

            image[row][col].rgbtBlue = avg;
            image[row][col].rgbtGreen = avg;
            image[row][col].rgbtRed = avg;
        }
    }

    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    int sepiaRed = 0, sepiaGreen = 0, sepiaBlue = 0;

    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < width; col++)
				{
            sepiaGreen = (int) round(.349 * image[row][col].rgbtRed + .686 * image[row][col].rgbtGreen + .168 * image[row][col].rgbtBlue);
            sepiaBlue = (int) round(.272 * image[row][col].rgbtRed + .534 * image[row][col].rgbtGreen + .131 * image[row][col].rgbtBlue);
            sepiaRed = (int) round(.393 * image[row][col].rgbtRed + .769 * image[row][col].rgbtGreen + .189 * image[row][col].rgbtBlue);

            if (sepiaGreen > 255)
                sepiaGreen = 255;
            if (sepiaBlue > 255)
                sepiaBlue = 255;
            if (sepiaRed > 255)
                sepiaRed = 255;

            image[row][col].rgbtBlue = sepiaBlue;
            image[row][col].rgbtGreen = sepiaGreen;
            image[row][col].rgbtRed = sepiaRed;
        }
    }

    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    int limit = (width % 2 == 0) ? width / 2 : (width - 1) / 2;

    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < limit ; col++)
				{
            RGBTRIPLE temp = image[row][width - col - 1];
            image[row][width - col - 1] = image[row][col];
            image[row][col] = temp;
        }
    }

    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE img_copy[height][width];

    // copy the image
    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < width; col++)
				{
            img_copy[row][col] = image[row][col];
        }
    }

    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < width; col++)
				{

            int red = 0, green = 0, blue = 0;
            int count = 0;

            for (int i = row - 1; i <= row + 1; i++)
						{
                if ((i >= 0 && i < height))
								{
                    for (int j = col - 1; j <= col + 1; j++)
										{
                        if ((j >= 0 && j < width))
												{
                            blue += img_copy[i][j].rgbtBlue;
                            green += img_copy[i][j].rgbtGreen;
                            red += img_copy[i][j].rgbtRed;

                            count++;
                        }
                    }
                }
            }

            int avg_blue = (int) round((float) blue / count);
            int avg_green = (int) round((float) green / count);
            int avg_red = (int) round((float) red / count);

            image[row][col].rgbtBlue = avg_blue;
            image[row][col].rgbtGreen = avg_green;
            image[row][col].rgbtRed = avg_red;
        }
    }

    return;
}