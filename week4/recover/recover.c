#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

int SIGNATURE_SIZE = 4;
int BLOCK_SIZE = 512;

// block size = 512 bytes
int main(int argc, char *argv[])
{
    if (argc != 2)
		{
        printf("Usage: ./recover <file name>\n");
        return 1;
    }

    // Open the memory card
    FILE *m_card = fopen(argv[1], "r");

    if (m_card == NULL)
		{
        printf("Cannot open the file.\n");
        return 1;
    }

    uint8_t buffer[BLOCK_SIZE];

    // Read the memory card
    int file_count = 0;
    char *filename = malloc(sizeof("###.jpg"));
    if (filename == NULL)
		{
        printf("Error.\n");
        return 1;
    }

    FILE *img = NULL;

    while (fread(buffer, 1, BLOCK_SIZE, m_card))
		{
        // Check the first 4 bits of the first 4 bytes
        // (buffer[3] & 0xf0) == 0xe0 --> & bitwise AND, just look at the first four bits and
        // set the rest to 0. 0xe0 == 1110
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
				{
            if (file_count != 0)
                fclose(img);

            sprintf(filename, "%03i.jpg", file_count);
            img = fopen(filename, "w");

            file_count++;
        }

        if (file_count > 0)
            fwrite(buffer, BLOCK_SIZE, 1, img);
    }

    free(filename);
    fclose(m_card);
    fclose(img);
}