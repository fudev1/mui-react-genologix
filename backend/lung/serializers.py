from rest_framework import serializers

class LungImageSerializer(serializers.Serializer):
    file = serializers.ImageField(use_url=False)

    def validate_file(self, value):
        """
        Vérifiez que le fichier est une image et répondez aux exigences
        """
        if value.size > 1024 * 1024 * 5:
            raise serializers.ValidationError("The image size is too large ( > 5MB )")
        if not value.image.mode == 'L':
            raise serializers.ValidationError("L'image doit être en niveaux de gris.")
        return value
